import { Injectable, OnModuleDestroy, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Api, EditorCommandList, ErpDataObject, ErpEditorObjectMeta, RequestParams } from "src/api/abasApi";
import { WorkspaceDto } from "src/model/workspace";

@Injectable({ scope: Scope.TRANSIENT })
export class WsService implements OnModuleDestroy {

  private _api:Api<unknown>;

  private mandant:string;
  private berammandant:string;

  constructor(private configService: ConfigService){
    this.mandant = this.configService.get<string>('MANDANT');
    this.berammandant = this.configService.get<string>('BERAMMANDANT');
    const baseApiParams: RequestParams = {
      credentials: 'same-origin',
      headers: {'Authorization': 'Basic ' + this.encode('_abas_:'+this.configService.get<string>('PASSWD')),
                'Accept-Language':'en'},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
    this._api = new Api({
      baseApiParams:baseApiParams
    });

  }

  onModuleDestroy() {
  }

  /**
   * 
   * @param data string amit base64 kódolássá kell alakítani
   * @returns 
   */
  public encode(data:string):string {
    let buff = Buffer.from(data);
    return buff.toString('base64');
  }

  /**
   * 
   * @param data string amit base64 kódoéásról utf8-ra alakítunk vissza
   * @returns 
   */
  public decode(data:string):string {
    let buff = Buffer.from(data, 'base64');
    return buff.toString('utf8');
  }


  /**
   * POST:/r/{clientId}/obj/data/{table}/{id}/commands/{command}
   * @param table 
   * @param id 
   * @param command 
   * @returns 
   */
  async GetDatabaseObjectWorkspaceEditor(table:string,id:string,command:string)
  {
    const ret = await this._api.r.postCommand1(this.mandant, table, id, command, {});
    const m = ret.data.content.data.meta as ErpEditorObjectMeta;
    const r:WorkspaceDto = {
      workingset: m.workingSetId,
      workingseteditor: m.workingSetEditorId
    };

    return r;
  }

  /**
   * POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/commands/SUBEDIT
   * @param ws 
   * @param subeditor 
   * @returns 
   */
  async GetHeaderSubeditor(ws:WorkspaceDto, subeditor:string) {
    const ret = await this._api.r.openSubEditor1(this.mandant, ws.workingset, ws.workingseteditor, subeditor, {});
    const m = ret.data.content.data.meta as ErpEditorObjectMeta;
    const r:WorkspaceDto = {
      workingset: m.workingSetId,
      workingseteditor: m.workingSetEditorId
    };
    return r;
  }

  /**
   * POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/commands/SUBEDIT
   * @param ws 
   * @param subeditor 
   * @returns 
   */
  async GetTableSubeditor(ws:WorkspaceDto, rowSpec:string, subeditor:string) {
    const ret = await this._api.r.openSubEditor(this.mandant, ws.workingset, ws.workingseteditor, rowSpec, subeditor, {});
    const m = ret.data.content.data.meta as ErpEditorObjectMeta;
    const r:WorkspaceDto = {
      workingset: m.workingSetId,
      workingseteditor: m.workingSetEditorId
    };
    return r;
  }

  /**
   * POST:/r/{clientId}/workspace/{workingSet}/commands/{command}
   * @param wsid 
   * @param command 
   * @returns 
   */
  async postWorkingSetCommand(wsid:string, command:string){
    return await this._api.r.postCommand(this.mandant, wsid, command);
  }

  /**
   * POST:/r/{clientId}/obj/data/{table}/commands/{command}
   */
  async postDatabaseCommand(table:string, command:any){
    const ret = await this._api.r.postCommand2(this.mandant, table, command, {});
    const m = ret.data.content.data.meta as ErpEditorObjectMeta;
    const r:WorkspaceDto = {
        workingset: m.workingSetId,
        workingseteditor: m.workingSetEditorId
    };
    return r;
  }

  
  /**
   * POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}
   * @param ws 
   * @param data 
   * @returns 
   */
  async postWorkingSetEditorCommand(ws:WorkspaceDto, data:EditorCommandList)
  {
    const resp = await this._api.r.executeOnWipObject(this.mandant, ws.workingset, ws.workingseteditor, data);
    if (resp.status == 200){
      return resp.data.content.data;
    } else {
      return null;
    }
  }

  /**
   * GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}
   * @param ws 
   * @returns 
   */
  async getWorkingSetEditorState(ws:WorkspaceDto):Promise<ErpDataObject> {
    const resp = await this._api.r.getWipObject(this.mandant, ws.workingset, ws.workingseteditor);
    if (resp.status == 200){
      return resp.data.content.data;
    } else {
      return null;
    }
  }

  /**
   * POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/CANCEL
   * @param ws 
   * @returns 
   */
  async workingSetEditorCancel(ws:WorkspaceDto):Promise<ErpDataObject> {
    const resp = await this._api.r.cancel(this.mandant, ws.workingset, ws.workingseteditor, {});
    if (resp.status == 200)
    {
      if (resp.data.meta.contentType == "EditSuccessResponse")
      {
        return resp.data.content.data;
      }
      return null;
    }
  }

  /**
   * POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/COMMIT
   * @param ws 
   * @returns 
   */
  async workingSetEditorCommit(ws:WorkspaceDto):Promise<ErpDataObject> {
    const resp = await this._api.r.commit(this.mandant, ws.workingset, ws.workingseteditor, {});
    if (resp.status == 200)
    {
      if (resp.data.meta.contentType == "EditSuccessResponse")
      {
        return resp.data.content.data;
      }
      return null;
    }
  }


  /**
   * PUT:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/value
   * @param ws 
   * @param field 
   * @param value 
   * @returns 
   */
  async setWorkingSetEditorHeaderValue(ws:WorkspaceDto, field:string, value:string):Promise<ErpDataObject> {
    const resp = await this._api.r.putHeadValue(this.mandant,ws.workingset,ws.workingseteditor, field, value);
    if (resp.status == 200)
    {
      return resp.data.content.data;
    }
    return null;
  }

  /**
   * PUT:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/value
   * @param ws 
   * @param rowSpec 
   * @param field 
   * @param value 
   * @returns 
   */
  async setWorkingSetEditorTableValue(ws:WorkspaceDto, rowSpec:string, field:string, value:string):Promise<ErpDataObject> {
    const resp = await this._api.r.putTableValue(this.mandant,ws.workingset,ws.workingseteditor, rowSpec, field, value);
    if (resp.status == 200)
    {
      return resp.data.content.data;
    }
    return null;
  }

  /**
   * POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}
   * @param ws 
   * @param rowSpec 
   * @returns 
   */
  async deleteWorkingSetEditorRow(ws:WorkspaceDto, rowSpec:string):Promise<ErpDataObject> {
    const resp = await this._api.r.executeOnWipObject(this.mandant,ws.workingset,ws.workingseteditor, 
      {
        actions : [
          {rowSpec:rowSpec, _type:"DeleteRow",  dialogAnswers: []}
        ]
       }
      );
    if (resp.status == 200)
    {
      return resp.data.content.data;
    }
    return null;
  }
}
