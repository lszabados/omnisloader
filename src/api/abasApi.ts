/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Detailed information about an error. If the error was detected by the backend abas erp client, <code>error</code> contains the original error message. */
export interface AbasErpError {
  /** The category of the error. */
  category:
    | 'MISSING_OBJECT'
    | 'ACCESS_DENIED'
    | 'MISSING_ARGUMENT'
    | 'ILLEGAL_ARGUMENT'
    | 'UNAVAILABLE'
    | 'AUTHENTICATION_FAILURE'
    | 'RECORD_LOCKED'
    | 'INTERNAL_ERROR'
    | 'OTHER';
  error: ErpMessage | ErpProgressMessage;
  /** Additional messages for this error. */
  details?: (ErpMessage | ErpProgressMessage)[];
  /** The error code for this error. */
  errorCode?: 'MISSING_WORKINGSET' | 'MISSING_WORKINGSET_EDITOR';
}

/** Response for a failed edit operation. */
export type AbstractEditErrorResponse = UtilRequiredKeys<AbstractEditResponse, 'data' | 'messages'> & {
  /** Remaining actions after an error occurred. */
  remainingActions: RemainingActions;
  /** Detailed information about an error. If the error was detected by the backend abas erp client, <code>error</code> contains the original error message. */
  error: AbasErpError;
};

/** Either finish an edit operation successfully or with an error. */
export interface AbstractEditResponse {
  /** A data object from an ERP database.<p><strong>Note:</strong> The <code>abasErpError</code> property is only populated by the <code>byIds</code> resource.</p> */
  data: ErpDataObject;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Response for a successful edit operation. */
export type AbstractEditSuccessResponse = UtilRequiredKeys<AbstractEditResponse, 'data' | 'messages'>;

/** The metadata associated with an ERP data object. */
export interface AbstractErpDataObjectMeta {
  /** The ERP data source type. */
  sourceType: 'QUERY' | 'EDITOR' | 'INFOSYSTEM';
  /** Specifies the link to the target object type. */
  objectType: string;
  /** Erp client name. */
  client: string;
  /** Schema version of the corresponding data record. */
  schemaVersion: string;
  /** Group number. */
  group: string;
  /** Object group number. */
  objectGroup: string;
  /** Data record ID. */
  id: string;
  /** Data record identity number. */
  identNumber: string;
  /** Data record version number (<code>versionn</code> field value). */
  version: string;
  /**
   * Data record last modification date.
   * @format date-time
   */
  lastModified: string;
  /** Data record generated tag. */
  tag: string;
  /** Time stamp of the moment this record was filed (<code>ablagen</code> field value). */
  filingVersion: string;
  /**
   * Data record table total row count.
   * @format int32
   */
  rowCount?: number;
  /**
   * First row of the table result window.
   * @format int32
   */
  tableOffset?: number;
  /**
   * Number of items retrieved from the table result window.
   * @format int32
   */
  tableLimit?: number;
  /** Link to a related resource, e.g. an editor command, an action, or a subresource. */
  link?: Link;
  /** List of words that may be highlighted e.g. if this data object belongs to a search result. */
  keywords?: string[];
  /**
   * Score number of the search hit.
   * @format double
   */
  score?: number;
}

export interface AbstractErpMessage {
  /** The text(s) of this message. */
  text: string[];
  /** Type of this message. */
  type?: 'STATUS' | 'TEXT' | 'ERROR' | 'PROGRESS';
  /** Sub-type of this message. */
  subType?:
    | 'STATUS'
    | 'LOCK'
    | 'CONFSTATUS'
    | 'TIMEOUT'
    | 'TEXT'
    | 'SYSCALLOUT'
    | 'SYSCALLERR'
    | 'CMDPARALLEL'
    | 'BROWSER'
    | 'UNKNOWN';
  /**
   * The erp message number.
   * @format int32
   */
  erpNumber?: number;
  _type: string;
}

/** Cancel the edp editor. */
export type Cancel = UtilRequiredKeys<EditorCloseCommand, 'dialogAnswers'> & {
  /** Set to true to cancel sub-editors as well. */
  includeSubEditors: boolean;
};

/** The column field name and its desired sorting order. */
export interface ColumnOrder {
  /** The column's field name. */
  fieldName: string;
  /** Sorting Order. */
  direction?: 'ASC' | 'DESC';
}

/** Commit the edp editor. */
export type Commit = UtilRequiredKeys<EditorCloseCommand, 'dialogAnswers'>;

/** Delete rows in the data object. See EDP command [RDL](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.18) for more details. */
export type DeleteRows = UtilRequiredKeys<EditorEditCommand, 'dialogAnswers'> & {
  /** Specification of the rows to be deleted. */
  rowSpec: string;
};

/** Provide an answer for a dialog. */
export interface DialogAnswer {
  /** The ID of the dialog. */
  id: string;
  /** The value(s) for this dialog. */
  values: string[];
}

export interface DialogAttribute {
  name: string;
  value: string;
}

/** Details for a dialog that needs to be answered.  See also [edp specification for dialogs](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.6.html#300.17.2.3.6.12) */
export interface DialogInfo {
  /** Source of the dialog. */
  source: 'EDITOR' | 'SUBEDITOR';
  /** Indicates which property should be used to answer the dialog. */
  answersProperty: 'dialogAnswers' | 'screenEnterDialogAnswers';
  /** Type of dialog. */
  type: 'CONFIRMATION' | 'CHOICE' | 'LIST' | 'TEXTINPUT';
  /** ID of the dialog. */
  id: string;
  /** Title of the dialog. */
  title: string;
  /** Prompt of the dialog. */
  prompt: string;
  /** Default value for the dialog answer. */
  defaultValue?: string;
  /** For dialog type 'LIST' this contains the items. */
  listItems?: ListDialogItem[];
  /** For dialog type 'LIST' this column headers. */
  columnHeaders: string[];
  /** Additional attributes for dialog. */
  attributes: DialogAttribute[];
  /** Convenience access to the 'HIDDEN' attribute. */
  hidden?: boolean;
  /**
   * Convenience access to the 'INPUTLEN' attribute.
   * @format int32
   */
  inputLength?: number;
  /**
   * Convenience access to the 'NUMITEMS' attribute.
   * @format int32
   */
  numItems?: number;
  /**
   * Convenience access to the 'NUMCOLS' attribute.
   * @format int32
   */
  numColumns?: number;
  /** Convenience access to the 'MULTISELECT' attribute. */
  multiSelect?: boolean;
}

/** Response for an edit operation that failed because of a dialog. */
export type EditDialogResponse = AbstractEditErrorResponse & {
  /** Details for a dialog that needs to be answered.  See also [edp specification for dialogs](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.6.html#300.17.2.3.6.12) */
  dialogInfo: DialogInfo;
};

/** Response for a failed edit operation. */
export type EditErrorResponse = AbstractEditErrorResponse;

/** Response for a successful edit operation. */
export type EditSuccessResponse = AbstractEditSuccessResponse;

/** Close the edp editor. */
export interface EditorCloseCommand {
  /** List of answers to dialogs. */
  dialogAnswers: DialogAnswer[];
  _type: string;
}

/** Actions that can be applied in an editor. */
export interface EditorEditCommand {
  /** List of answers to dialogs. */
  dialogAnswers: DialogAnswer[];
  _type: string;
}

/** EDP Editor initialization commands. */
export interface EditorInitCommand {
  /** List of answers to dialogs. */
  dialogAnswers: DialogAnswer[];
  /** List of answers to dialogs during screen enter. */
  screenEnterDialogAnswers: DialogAnswer[];
  _type: string;
}

/** Envelope for a REST API response.  */
export interface EnvelopeAbstractEditResponse {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  content: EditDialogResponse | EditErrorResponse | EditSuccessResponse | ErpPrintSuccessResponse;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A data object from an ERP database.<p><strong>Note:</strong> The <code>abasErpError</code> property is only populated by the <code>byIds</code> resource.</p> */
export interface ErpDataObject {
  meta: ErpDataObjectMeta | ErpEditorObjectMeta;
  /** Links to resources pertaining to this object. */
  links?: Link[];
  /** The head part of an ERP data object. */
  head: Head;
  /** The rows of the table part of the object. */
  table?: Row[];
  /** Detailed information about an error. If the error was detected by the backend abas erp client, <code>error</code> contains the original error message. */
  abasErpError?: AbasErpError;
}

/** The metadata associated with an ERP data object. */
export type ErpDataObjectMeta = UtilRequiredKeys<
  AbstractErpDataObjectMeta,
  | 'sourceType'
  | 'objectType'
  | 'client'
  | 'schemaVersion'
  | 'group'
  | 'objectGroup'
  | 'id'
  | 'identNumber'
  | 'version'
  | 'lastModified'
  | 'tag'
  | 'filingVersion'
>;

/** The metadata of an ERP object capturing the editor state it was created in. <p>See the <a href="https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.1">EDP GTS command reference</a> for details on the property values.</p> */
export type ErpEditorObjectMeta = UtilRequiredKeys<
  AbstractErpDataObjectMeta,
  | 'sourceType'
  | 'objectType'
  | 'client'
  | 'schemaVersion'
  | 'group'
  | 'objectGroup'
  | 'id'
  | 'identNumber'
  | 'version'
  | 'lastModified'
  | 'tag'
  | 'filingVersion'
> & {
  /** @format int32 */
  modifications?: number;
  modified?: boolean;
  exclusive?: boolean;
  fieldNames: string[];
  editRowId: string;
  /** @format int32 */
  rowNumber?: number;
  /** @format int32 */
  screenNumber?: number;
  /** The editor state. */
  state: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE' | 'CANCELED' | 'COMMITTED';
  /** An ERP Edit Action. */
  action:
    | 'DONE'
    | 'GET'
    | 'RELEASE'
    | 'DELIVERY'
    | 'INVOICE'
    | 'PAYMENT'
    | 'REVERSAL'
    | 'CALCULATE'
    | 'TRANSFER'
    | 'DELETE'
    | 'VIEW'
    | 'UPDATE'
    | 'NEW'
    | 'COPY'
    | 'MODIFY'
    | 'STORE'
    | 'REMOVE'
    | 'DO'
    | 'RETURN';
  typeCommand: string;
  priority: 'EmptyEntry' | 'NoPrio' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'MAX_PLUS_ONE';
  workingSetId: string;
  workingSetEditorId: string;
  screenCtxConfig: string;
  screenCtxUser: string;
  screenCtxFOP: string;
  nextFieldNames: string[];
  nextRow: number;
};

export type ErpMessage = UtilRequiredKeys<AbstractErpMessage, 'text'> & {
  /** Context fields for this message. */
  fieldNames: string[];
  /** Context row for this message. */
  rowSpec: string;
  /** Context value for this message. E.g. in case of an illegal field value. */
  value?: string;
};

/**
 * Response for a successful print operation.
 * <code>document</code> contains the document created by this print operation.
 */
export type ErpPrintSuccessResponse = AbstractEditSuccessResponse & {
  /**
   * A workspace document.
   * Follow <code>link</code> to the resource of this document
   */
  document?: WorkspaceDocument;
  /** The printer. */
  printer?: ErpPrinter;
};

/** The printer. */
export interface ErpPrinter {
  /** The id of the printer. */
  id: string;
  /** The type of the printer. */
  type: string;
  /** The name of the printer. */
  name?: string;
}

/** An ErpMessage used to notify about progress of an operation. */
export type ErpProgressMessage = ErpMessage & {
  /** The type of this message. */
  progressType: 'START' | 'UPDATE' | 'STOP';
  /**
   * The level of this message.
   * @format int32
   */
  level?: number;
  /** The title of this message. */
  title?: string;
};

/** An ERP data object field. */
export interface Field {
  /** Field text value. */
  text: string;
  /** Field value. */
  value?: object;
  links?: Link[];
  /** Is the field a mandatory field? */
  mandatory?: boolean;
  /** Is the field a read only field? */
  readOnly?: boolean;
  /** Is the field an accessible field? */
  accessible?: boolean;
  /** Is the field value truncated? This happens when the field is longer than the <code>maxFTextSize</code> query parameter. */
  truncated?: boolean;
  /** Field name */
  name: string;
}

/** The head part of an ERP data object. */
export interface Head {
  /** The fields that this part contains. */
  fields?: Field[];
}

/** Inserts a row into the data object. See EDP command [RIN](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.17) for more details. */
export type InsertRow = UtilRequiredKeys<EditorEditCommand, 'dialogAnswers'> & {
  /** Position at which an empty row should be inserted. */
  rowSpec?: string;
};

/** Link to a related resource, e.g. an editor command, an action, or a subresource. */
export interface Link {
  /** Link description. */
  description: string;
  /** A uniform resource name (urn) identifying the relationship between the source and destination resources. For relationships within abas ERP, this has the namespace <code>urn:abas:</code>. */
  rel: string;
  /** The URL to the target resource, relative to the REST API's base URL. */
  href: string;
  /** The type of the target resource. */
  objectType: string;
}

export interface ListDialogItem {
  value: string;
  columns: string[];
}

/** Open a new edp editor. */
export interface MainEditorInitCommand {
  /** List of answers to dialogs. */
  dialogAnswers: DialogAnswer[];
  /** List of answers to dialogs during screen enter. */
  screenEnterDialogAnswers: DialogAnswer[];
  _type: string;
}

/** Metadata associated with an Envelope. */
export interface Meta {
  contentType: string;
}

/** Moves rows in the data object. See EDP command [RMV](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.19) for more details. */
export type MoveRows = UtilRequiredKeys<EditorEditCommand, 'dialogAnswers'> & {
  /** Specification of the rows to be moved. */
  fromRow?: string;
  /** Row specification for the row before which the "fromRow" row is to be moved to. */
  toRow?: string;
};

/** Open an editor. See more details about EDI commands [here](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.6) and about database commands [here](https://extranet.abas.de/sub_de/help/he/html/28B.2.html) */
export type OpenEditor = UtilRequiredKeys<MainEditorInitCommand, 'dialogAnswers' | 'screenEnterDialogAnswers'> & {
  /** Menu choice. */
  menuChoice?: string;
  /**
   * Erp table name.
   * @example "0:1"
   */
  tableName?: string;
  /** ID of the database object used for this editor. */
  editRefID?: string;
  /** Type of the ID. */
  editRefType?: 'EMPTY' | 'REF' | 'NUMSW';
  /** An ERP Edit Action. */
  editAction?:
    | 'DONE'
    | 'GET'
    | 'RELEASE'
    | 'DELIVERY'
    | 'INVOICE'
    | 'PAYMENT'
    | 'REVERSAL'
    | 'CALCULATE'
    | 'TRANSFER'
    | 'DELETE'
    | 'VIEW'
    | 'UPDATE'
    | 'NEW'
    | 'COPY'
    | 'MODIFY'
    | 'STORE'
    | 'REMOVE'
    | 'DO'
    | 'RETURN';
};

/** Open an edp editor with a command string. */
export type OpenEditorCommandString = UtilRequiredKeys<
  MainEditorInitCommand,
  'dialogAnswers' | 'screenEnterDialogAnswers'
> & {
  /**
   * Command string used to open the editor. The syntax can be referenced [here](https://extranet.abas.de/sub_de/help/he/html/28B.html).
   * @example "<(Notes)><(New)>,(Note)?ursache=(1,2,3)"
   */
  cmd?: string;
};

/** Open an edp editor with an infosystem. */
export type OpenInfosystem = UtilRequiredKeys<MainEditorInitCommand, 'dialogAnswers' | 'screenEnterDialogAnswers'> & {
  /**
   * Search word of the infosystem.
   * @example "LKU"
   */
  searchWord: string;
  /**
   * Workspace of the infosystem.
   * @example "st"
   */
  workspace: string;
};

/** Open an edp sub-editor within a working set editor. */
export type OpenSubEditor = UtilRequiredKeys<EditorInitCommand, 'dialogAnswers' | 'screenEnterDialogAnswers'> & {
  /** The row context. */
  rowSpec?: string;
  /** The field name for the open sub-editor command. */
  fieldName: string;
};

/** Open an edp sub-editor with a command string. */
export type OpenSubEditorByCmd = UtilRequiredKeys<EditorInitCommand, 'dialogAnswers' | 'screenEnterDialogAnswers'> & {
  /** The row specification. */
  rowSpec: string;
  /**
   * The open sub-editor command.
   * @example "<(Infosystem)>ID_OF_AN_INFOSYSTEM<(Call)>?aufruf=CALL_PARAMETERS|bstart="
   */
  command: string;
};

/** Sorts the rows in the table by the specified columns and direction. */
export type OrderTableBy = UtilRequiredKeys<EditorEditCommand, 'dialogAnswers'> & {
  /** The list of column field names and their desired sorting order. */
  order: ColumnOrder[];
};

/** Remaining actions after an error occurred. */
export interface RemainingActions {
  /**
   * Number of successful actions.
   * @format int32
   */
  successCount?: number;
  /** The list of actions from the original request, that did not get applied. The first action in this list is the one that produced the error. */
  actions?: (
    | Cancel
    | Commit
    | DeleteRows
    | InsertRow
    | MoveRows
    | OrderTableBy
    | ResetFieldValue
    | SaveAndReload
    | SetContextField
    | SetFieldValue
    | SetFreeText
    | OpenEditor
    | OpenEditorCommandString
    | OpenInfosystem
    | OpenSubEditor
    | OpenSubEditorByCmd
  )[];
}

/** Resets a field value in an edit action to the original value. See EDP command [RFV](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.14) for more details. */
export type ResetFieldValue = UtilRequiredKeys<EditorEditCommand, 'dialogAnswers'> & {
  /** Specification of the row for the field to be reset; The value 0 or if nothing is specified here will reset a field value in the header. */
  rowSpec?: string;
  /** Name of the field to be reset. */
  fieldName: string;
};

/** A row of data associated with an ERP data object. */
export interface Row {
  /** The fields that this part contains. */
  fields?: Field[];
  /** Links to resources pertaining to this row. */
  links?: Link[];
  /** Row edit id. */
  editId?: string;
  /**
   * Row number.
   * @format int32
   */
  number?: number;
  /** The status associated with a row. */
  status?: 'CREATED' | 'UPDATED' | 'DELETED';
}

/** Saves the editor data and re-opens the editor. See EDP command [SAV](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.11) for more details. */
export type SaveAndReload = UtilRequiredKeys<EditorEditCommand, 'dialogAnswers'>;

/** Sets the context field for the next editor operation. See EDP command [SCF](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.20) for more details. */
export type SetContextField = UtilRequiredKeys<EditorEditCommand, 'dialogAnswers'> & {
  /** Specification of the row for the field that should be set as the context field for the next editor operation. */
  rowSpec?: string;
  /** Name of the field that should be set as the context field for the next editor operation. */
  fieldName: string;
};

/** Sets the field with the given fieldName to the given value. See EDP command [SFV](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.12) for more details. */
export type SetFieldValue = UtilRequiredKeys<EditorEditCommand, 'dialogAnswers'> & {
  /** New value of the field. */
  value: string;
  /** Specification of the row for the field to be edited. The value 0 or if nothing is specified here will set a field value in the header. */
  rowSpec?: string;
  /** Name of the field to be edited, optionally with type modification, i.e. deviating type or with complete display change. */
  fieldName: string;
};

/**
 * Sets a free text in an edit action. See EDP command [SFT](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.13) for more details.
 * **Note:** The size of the value that can be set by this action is constrained by the maxPostSize value set by your administrator. You should use the resource "PUT /r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/value", if you need to post a bigger value.
 */
export type SetFreeText = UtilRequiredKeys<EditorEditCommand, 'dialogAnswers'> & {
  /** New value of the free text field. */
  value: string;
  /** Specification of the row for the free text field to be edited; The value 0 or if nothing is specified here will set a field value in the header. */
  rowSpec?: string;
  /** Name of the free text field to be edited. */
  fieldName: string;
};

/**
 * A workspace document.
 * Follow <code>link</code> to the resource of this document
 */
export interface WorkspaceDocument {
  /** The id of this document. */
  id: string;
  /** Link to a related resource, e.g. an editor command, an action, or a subresource. */
  link?: Link;
  /** A description for this document. */
  description?: string;
  /** The file name of this document. */
  fileName?: string;
  /** The language of this document. */
  language?: string;
  /** The encoding of this document. */
  encoding?: string;
  /** The mime type of this document. */
  mimeType?: string;
  /**
   * The date this document was created.
   * @format date-time
   */
  created?: string;
  /**
   * The date this document last modified created.
   * @format date-time
   */
  lastModified?: string;
  /**
   * The size of this document (in bytes).
   * @format int64
   */
  sizeInBytes?: number;
}

/** The settings of a working set. Object used to both get and set values. If you are setting the properties of a working set in a request then any missing or null value means the setting is not changed. */
export interface WorkingSetSettings {
  /**
   * The timeout value.
   * @format int32
   */
  timeout?: number;
  /**
   * The blocking action timeout value.
   * @format int32
   */
  blockingActionTimeout?: number;
  /** The dialog mode value. */
  dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
}

export interface EditorCommandList {
  /** Update list of fields for observation (change notifications) in the editor. */
  observation?: UpdateEditorObservations;
  /** Define a window of rows for one or more operations in an Editor. */
  tableWindow?: SetEditorTableWindow;
  /** List of actions applied to the editor in order. */
  actions?: (
    | Cancel
    | Commit
    | DeleteRows
    | InsertRow
    | MoveRows
    | OrderTableBy
    | ResetFieldValue
    | SaveAndReload
    | SetContextField
    | SetFieldValue
    | SetFreeText
    | OpenEditor
    | OpenEditorCommandString
    | OpenInfosystem
    | OpenSubEditor
    | OpenSubEditorByCmd
  )[];
}

/** Define a window of rows for one or more operations in an Editor. */
export interface SetEditorTableWindow {
  /**
   * The row offset in the table.
   * @format int32
   */
  offset?: number;
  /**
   * The maximum no of rows to limit.
   * @format int32
   */
  limit?: number;
}

/** Update list of fields for observation (change notifications) in the editor. */
export interface UpdateEditorObservations {
  /**
   * Operation for updating fields for change notifications in an Editor.
   * * ADD: Add fields to receive change notifications.
   * * REMOVE: Remove fields from change notifications.
   *  * SET: Replace existing list with a new list of fields to receive change notifications.
   */
  op: 'ADD' | 'REMOVE' | 'SET';
  /** List of head fields for the operation. */
  headFields?: string;
  /** List of table fields for the operation. */
  tableFields?: string;
}

/** Parameters for the print command. */
export interface ErpPrintParameters {
  /** The layout to use for printing. */
  layout?: string;
  /** The printer to use for printing. */
  printer?: string;
  /** Specifies the output locale. */
  locale?: string;
  /**
   * The page from parameter.
   * @format int32
   */
  pageFrom?: number;
  /**
   * The page to parameter.
   * @format int32
   */
  pageTo?: number;
  /**
   * Specifies how many copies to print.
   * @format int32
   */
  copies?: number;
  /**
   * Specifies how many carbon copies (including originals) to print.
   * @format int32
   */
  carbonCopies?: number;
  /** The document MIME type. */
  mimeType?: string;
  /** The file type to use for printing. */
  fileType?: string;
  /** The file name to print to. */
  fileName?: string;
  /** Specifies whether the print output should be archived. This requires DMS to be enabled. */
  archive?: boolean;
}

/** ID and value for a facet filter. */
export interface FacetParameter {
  /**
   * The ID of the facet filter.
   * @example "GROUP"
   */
  id: string;
  /**
   * The value for the facet filter.
   * @example "0:1"
   */
  value: string;
}

/** Head and table field list for an abas ERP table. */
export interface FieldListDescriptor {
  /**
   * Comma-separated list of header fields to search in. Use "-" for empty field list and "*" for all fields.
   * @example "id,nummer,such,sucherw"
   */
  headFields?: string;
  /**
   * Comma-separated list of table fields to search in. Use "-" for empty field list and "*" for all fields.
   * @example "*"
   */
  tableFields?: string;
  /** The abas ERP table for the field lists. This can either be "database:group" or just "database:". E.g. "0:1" or "0:" */
  scope?: string;
}

/** ID and value for a filter. */
export interface FilterParameter {
  /**
   * The ID of the filter.
   * @example "GROUP"
   */
  id: string;
  /**
   * The value for the filter.
   * @example "0:1"
   */
  value: string;
}

/** Query, field lists, etc. for the database search. */
export interface SearchEngineQuery {
  /**
   * Comma-separated list of header fields to search in. Use "-" for empty field list and "*" for all fields.
   * @example "id,nummer,such,sucherw"
   */
  headFields?: string;
  /**
   * Comma-separated list of table fields to search in. Use "-" for empty field list and "*" for all fields.
   * @example "*"
   */
  tableFields?: string;
  /** Query expression. */
  query?: string;
  /**
   * Search engine query mode.
   * @default "DEFAULT"
   */
  mode?: 'DEFAULT' | 'PREFIX';
  /** Override field lists for certain abas ERP tables. By default "headFields" and "tableFields" is used for all records in the response. */
  fieldLists?: FieldListDescriptor[];
  /** The facet filter to limit the search results by. */
  facetFilter?: FacetParameter[];
  /** The filter parameters to limit the search space by. */
  filter?: FilterParameter[];
  /**
   * Result offset (for example, for paging). This is the number of items to skip in the result. If the total number of available items exceeds the limit, an offset greater than 0 must be used to iterate over all items.
   * @format int32
   */
  offset?: number;
  /**
   * Maximum number of items to retrieve. If limit is 0, all objects are returned.
   * @format int32
   */
  limit?: number;
  /**
   * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
   * @format int32
   */
  tableOffset?: number;
  /**
   * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
   * @format int32
   */
  tableLimit?: number;
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseSearchResultErpDataObjectList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseSearchResultErpDataObjectList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseSearchResultErpDataObjectList {
  /** A list of objects obtained by the search engine. */
  data: SearchResultErpDataObjectList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

export interface Facet {
  values?: FacetValue[];
  id?: string;
  label?: string;
}

export interface FacetValue {
  filtered?: boolean;
  /** @format int32 */
  count?: number;
  value?: string;
  label?: string;
}

/** Metadata on search results. */
export interface SearchMeta {
  query?: string;
  /**
   * The index of the first element of the results set contained in the search results.
   * @format int32
   */
  startIndex?: number;
  /**
   * The index of the last element of the results set contained in the search results; zero-based and exclusive. For example, if the total number of hits for the query is 50, and an offset of 20 and a limit of 5 is given, start index will be 20 and end index will be 25.
   * @format int32
   */
  endIndex?: number;
  /**
   * The total number of search results yielded by the query.
   * @format int32
   */
  totalHits?: number;
  context?: string;
  /**
   * The elapsed search time.
   * @format int32
   */
  totalSearchTime?: number;
  /** Column ordering. */
  order?: ColumnOrder[];
}

/** A list of objects obtained by the search engine. */
export interface SearchResultErpDataObjectList {
  links?: Link[];
  /** Metadata on search results. */
  meta: SearchMeta;
  erpDataObjects: ErpDataObject[];
  /** The applied facet filters. */
  facets?: Facet[];
}

export interface SubEditorInitCommandExtension {
  /** List of answers to dialogs during screen enter. */
  screenEnterDialogAnswers?: DialogAnswer[];
  /** List of answers to dialogs in parent editor (like buttonBefore event). */
  dialogAnswers?: DialogAnswer[];
}

/** Answers for dialogs needed in editor initialization. */
export interface EditorInitCommandExtension {
  /** List of answers to dialogs during screen enter. */
  screenEnterDialogAnswers?: DialogAnswer[];
}

export interface EditorCloseCommandExtension {
  /** List of answers to dialogs. */
  dialogAnswers?: DialogAnswer[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseWorkingSetEditor {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseWorkingSetEditor;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseWorkingSetEditor {
  /** An editor in a working set. */
  data: WorkingSetEditor;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** An editor in a working set. */
export interface WorkingSetEditor {
  /** The working set ID. */
  workingSetId: string;
  /** The working set editor ID. */
  workingSetEditorId: string;
  /** The editor state. */
  state: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE' | 'CANCELED' | 'COMMITTED';
  /** An ERP Edit Action. */
  action:
    | 'DONE'
    | 'GET'
    | 'RELEASE'
    | 'DELIVERY'
    | 'INVOICE'
    | 'PAYMENT'
    | 'REVERSAL'
    | 'CALCULATE'
    | 'TRANSFER'
    | 'DELETE'
    | 'VIEW'
    | 'UPDATE'
    | 'NEW'
    | 'COPY'
    | 'MODIFY'
    | 'STORE'
    | 'REMOVE'
    | 'DO'
    | 'RETURN';
  /** ID of current or last edited object. This state is empty during creation of a new object and being updated during save. */
  objectId: string;
  /** The ERP data source type. */
  sourceType: 'QUERY' | 'EDITOR' | 'INFOSYSTEM';
  /** The working set editor description. */
  description: string;
  /** Object group number. */
  objectGroup: string;
  /** Description of the object group number. */
  objectGroupDescr: string;
  /** Data record identity number. */
  identNumber: string;
  /**
   * The creation time of the working set editor.
   * @format date-time
   */
  creationTime: string;
  links?: Link[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeAbstractErpResponseErpDataObject {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  content: EditDialogResponse | EditErrorResponse | EditSuccessResponse | ErpPrintSuccessResponse;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** The blocking action client response. */
export interface BlockingActionClientResponse {
  /** The type of the blocking action response. */
  response: 'ABORTED' | 'FINISHED' | 'RENEW_TIMEOUT';
  /**
   * The timeout renewal to set.
   * @format int32
   */
  newTimeoutInSeconds?: number;
  _type: string;
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseWorkingSetEditorList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseWorkingSetEditorList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseWorkingSetEditorList {
  /** A list of working set editors. */
  data: WorkingSetEditorList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** A list of working set editors. */
export interface WorkingSetEditorList {
  workingSetEditors?: WorkingSetEditor[];
}

export interface MultipartRequest {
  fileMap?: Record<string, File>;
  multiFileMap?: {
    all?: Record<string, File>;
    empty?: boolean;
    [key: string]: any;
  };
  fileNames?: object;
}

/** Envelope for a REST API response.  */
export interface EnvelopeWorkspaceDocumentList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  content: WorkspaceDocumentList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

export interface WorkspaceDocumentList {
  documents?: WorkspaceDocument[];
}

export interface ErpDataObjectInput {
  /** Head fields with values. */
  head: HeadInput;
  /** Table fields with values. */
  table?: RowInput[];
}

export interface FieldInput {
  /** Field name */
  name: string;
  /** Field text value. */
  text?: string;
  /** Field value. */
  value?: object;
}

/** Head fields with values. */
export interface HeadInput {
  fields?: FieldInput[];
}

export interface RowInput {
  /**
   * Row number.
   * @format int32
   */
  number?: number;
  fields?: FieldInput[];
}

/** Query database records of a corresponding table. */
export interface DatabaseQuery {
  /** Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields. */
  headFields?: string;
  /** Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields. */
  tableFields?: string;
  /**
   * Result offset (for example, for paging). This is the number of items to skip in the result. If the total number of available items exceeds the limit, an offset greater than 0 must be used to iterate over all items.
   * @format int32
   */
  offset?: number;
  /**
   * Maximum number of items to retrieve. If limit is 0, all objects are returned.
   * @format int32
   */
  limit?: number;
  /**
   * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
   * @format int32
   */
  tableOffset?: number;
  /**
   * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
   * @format int32
   */
  tableLimit?: number;
  /** Query string. You can find the syntax information [here](https://extranet.abas.de/sub_de/help/he/html/2.6.18.9.html#00246_Selektionssyntax) */
  criteria?: string[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpDataObjectList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpDataObjectList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A list of database objects. */
export interface ErpDataObjectList {
  links?: Link[];
  /** The metadata associated with a list of ERP objects. */
  meta: ErpDataObjectListMeta;
  erpDataObjects: ErpDataObject[];
}

/** The metadata associated with a list of ERP objects. */
export interface ErpDataObjectListMeta {
  _type?: string;
}

/** A generic response. */
export interface ErpResponseErpDataObjectList {
  /** A list of database objects. */
  data: ErpDataObjectList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** IDs of the database records to read. */
export interface MultipleIds {
  /** The record ids. */
  ids?: string[];
}

export interface InfosystemCommands {
  /** Comma separated list of head fields to return. The language of field names can be changed via the 'variableLanguage' query parameter.  */
  headFields?: string;
  /** Comma separated list of table fields to return. The language of field names can be changed via the 'variableLanguage' query parameter.  */
  tableFields?: string;
  /** List of actions applied to the editor in order. */
  actions?: (
    | DeleteRows
    | InsertRow
    | MoveRows
    | OrderTableBy
    | ResetFieldValue
    | SaveAndReload
    | SetContextField
    | SetFieldValue
    | SetFreeText
  )[];
  closeAction?: Cancel | Commit;
  /**
   * Offset for table rows returned in the response.
   * @format int32
   */
  tableOffset?: number;
  /**
   * Limit for table rows returned in the response.
   * @format int32
   */
  tableLimit?: number;
  /** List of answers to dialogs during screen enter. */
  screenEnterDialogAnswers?: DialogAnswer[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpDataObject {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpDataObject;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseErpDataObject {
  /** A data object from an ERP database.<p><strong>Note:</strong> The <code>abasErpError</code> property is only populated by the <code>byIds</code> resource.</p> */
  data: ErpDataObject;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/**
 * Changes to be made to an edp editor.
 * <code>initAction</code> is used to open the editor. If no <code>closeAction<code> is given, the editor is canceled by default.
 */
export interface CommonEditorCommands {
  /** Comma separated list of head fields to return. The language of field names can be changed via the 'variableLanguage' query parameter.  */
  headFields?: string;
  /** Comma separated list of table fields to return. The language of field names can be changed via the 'variableLanguage' query parameter.  */
  tableFields?: string;
  /** List of actions applied to the editor in order. */
  actions?: (
    | DeleteRows
    | InsertRow
    | MoveRows
    | OrderTableBy
    | ResetFieldValue
    | SaveAndReload
    | SetContextField
    | SetFieldValue
    | SetFreeText
  )[];
  closeAction?: Cancel | Commit;
  /**
   * Offset for table rows returned in the response.
   * @format int32
   */
  tableOffset?: number;
  /**
   * Limit for table rows returned in the response.
   * @format int32
   */
  tableLimit?: number;
  initAction: OpenEditor | OpenEditorCommandString | OpenInfosystem;
}

/** Envelope for a REST API response.  */
export interface EnvelopeRootDirectory {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** Model for the root resource. */
  content: RootDirectory;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** An informational message or a message describing the cause of an error. */
export interface Message {
  /** The message contents. */
  message: string;
  /** Possible message types. */
  type?: 'INFO' | 'USER_ERROR' | 'APPLICATION_ERROR' | 'SYSTEM_ERROR' | 'SECURITY_ERROR';
}

/** Model for the root resource. */
export interface RootDirectory {
  externalVersion?: string;
  internalVersion?: string;
  protocolVersion?: string;
  messages: Message[];
  apidocs?: Link[];
  clients?: Link[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseLinkList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseLinkList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseLinkList {
  /** A list of links. */
  data: LinkList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** A list of links. */
export interface LinkList {
  links?: Link[];
  name?: string;
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseWorkspace {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseWorkspace;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseWorkspace {
  /** A Workspace. */
  data: Workspace;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** A working set. */
export interface WorkingSet {
  /** The working set id. */
  workingSetId: string;
  /** The working set label. */
  label: string;
  /**
   * The creation time of this working set.
   * @format date-time
   */
  creationTime: string;
  /**
   * The last access time of this working set.
   * @format date-time
   */
  lastAccessed: string;
  /**
   * The time on which this working set will expire and be removed.
   * @format date-time
   */
  expiresAt: string;
  links?: Link[];
}

/** A Workspace. */
export interface Workspace {
  /** A list of working sets in the workspace. */
  workingSets: WorkingSet[];
  links?: Link[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseWorkingSet {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseWorkingSet;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseWorkingSet {
  /** A working set. */
  data: WorkingSet;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpPrintLayoutList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpPrintLayoutList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** Print layout(s) as a definition of MIME type(s) and associated printer(s). */
export interface ErpPrintLayout {
  /** The ID of the print layout. */
  id: string;
  /** The name of the print layout. */
  name?: string;
  /** The list of supported MIME types and associated printers. */
  outputFormats?: ErpPrintOutputFormat[];
}

/** The list of print layouts. */
export interface ErpPrintLayoutList {
  layouts?: ErpPrintLayout[];
}

/** The supported MIME types for a printer. */
export interface ErpPrintMimeType {
  /** The ID of this MIME type. */
  id: string;
  /** The name of this MIME type. */
  name: string;
  /** The default extension for files of this MIME type. */
  defaultExtension: string;
  /** The description of this MIME type. */
  description?: string;
}

/** The MIME type and associated printer. */
export interface ErpPrintOutputFormat {
  /** The supported MIME types for a printer. */
  mimeType: ErpPrintMimeType;
  /** The printer. */
  printer: ErpPrinter;
}

/** A generic response. */
export interface ErpResponseErpPrintLayoutList {
  /** The list of print layouts. */
  data: ErpPrintLayoutList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpActionListItem {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpActionListItem;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A tree node in an action's menu structure. The <code>type</code> property serves to distinguish among the different menu entry types. */
export interface ErpActionListItem {
  /** The call parameter's id. */
  id: string;
  /** Indicates whether the values of the underlying call parameters can be sourced from the table part of the object. */
  table?: boolean;
  /** This command menu textual representation in the menu structure. */
  text: string;
  /** List of links pertaining to this command. */
  links?: Link[];
  /** Is this command enabled? */
  enabled?: boolean;
  /** Indicates whether this command is object-specific (when <code>false</code>) or generally available (when <code>true</code>). */
  common: boolean;
  /** Indicates whether this command has been implemented by a custom extension (when <code>true</code> or within the scope of the standard installation (when <code>false</code>). */
  custom: boolean;
  /** The type of an action menu entry. */
  type?: 'SeparatorLine' | 'BlankLine' | 'SubMenu' | 'Inline' | 'MenuItem';
  /** The menu entry's icon. */
  icon?: string;
  /** This menu entry's sub-elements. (Please note the contents of this list are of the data type "ErpActionListItem". This is correctly depicted in the schema but the swagger UI has an issue and will show the list as empty). */
  children?: ErpActionListItem[];
}

/** A generic response. */
export interface ErpResponseErpActionListItem {
  /** A tree node in an action's menu structure. The <code>type</code> property serves to distinguish among the different menu entry types. */
  data: ErpActionListItem;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseFieldValues {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseFieldValues;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseFieldValues {
  /** The field, its current value and all the possible values for it. */
  data: FieldValues;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** This contains the textual representation of an object's value and the original object from which the text value is derived. Additionally some other properties of the field are added. */
export type ExtendedFieldValueContainer = UtilRequiredKeys<FieldValueContainer, 'text'> & {
  links?: Link[];
  /** Is the field a mandatory field? */
  mandatory?: boolean;
  /** Is the field a read only field? */
  readOnly?: boolean;
  /** Is the field an accessible field? */
  accessible?: boolean;
};

/** This contains the textual representation of an object's value and the original object from which the text value is derived. */
export interface FieldValueContainer {
  /** Field text value. */
  text: string;
  /** Field value. */
  value?: object;
}

/** The field, its current value and all the possible values for it. */
export interface FieldValues {
  /** The field name, text value, object value along with the containing record id(row spec/edit id). */
  field: SimpleFieldStandalone;
  values: (FieldValueContainer | ExtendedFieldValueContainer | Field | SimpleFieldStandalone)[];
}

/** The field name, text value, object value along with the containing record id(row spec/edit id). */
export type SimpleFieldStandalone = UtilRequiredKeys<FieldValueContainer, 'text'> & {
  /** The row spec of the record which contains this field. */
  editId?: string;
  /** The name of this field. */
  name: string;
};

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpCommands {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpCommands;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** An executable command within an object's context. */
export interface ErpCommand {
  /** The call parameter's id. */
  id: string;
  /** Indicates whether the values of the underlying call parameters can be sourced from the table part of the object. */
  table?: boolean;
  /** This command menu textual representation in the menu structure. */
  text: string;
  /** List of links pertaining to this command. */
  links?: Link[];
  /** Is this command enabled? */
  enabled?: boolean;
  /** Indicates whether this command is object-specific (when <code>false</code>) or generally available (when <code>true</code>). */
  common: boolean;
  /** Indicates whether this command has been implemented by a custom extension (when <code>true</code> or within the scope of the standard installation (when <code>false</code>). */
  custom: boolean;
}

/** A list of executable ERP commands. */
export interface ErpCommands {
  /** The command list entries. */
  commands?: (ErpCommand | ErpActionListItem)[];
}

/** A generic response. */
export interface ErpResponseErpCommands {
  /** A list of executable ERP commands. */
  data: ErpCommands;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseWorkingSetSettings {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseWorkingSetSettings;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseWorkingSetSettings {
  /** The settings of a working set. Object used to both get and set values. If you are setting the properties of a working set in a request then any missing or null value means the setting is not changed. */
  data: WorkingSetSettings;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeString {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  content: string;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** Envelope for a REST API response.  */
export interface EnvelopeLinkList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A list of links. */
  content: LinkList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

export type StreamingResponseBody = object;

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpUserInfo {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpUserInfo;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseErpUserInfo {
  data: ErpUserInfo;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

export interface ErpUserInfo {
  code: ExtendedFieldValueContainer | Field;
  email: ExtendedFieldValueContainer | Field;
  name: ExtendedFieldValueContainer | Field;
  loginName: ExtendedFieldValueContainer | Field;
  account: ExtendedFieldValueContainer | Field;
  employee: ExtendedFieldValueContainer | Field;
  department: ExtendedFieldValueContainer | Field;
}

/** Type information for a [boolean](https://extranet.abas.de/sub_de/help/he/html/2.6.35.13.html) (B,B1,B2,B3). */
export type BooleanType = ErpType;

/** Type information for a [button](https://extranet.abas.de/sub_de/help/he/html/2.6.35.13.html) (BU*,DVB*,DVZ*). */
export type ButtonType = ErpType & {
  subEditorButton: boolean;
  withValue?: boolean;
};

/** Type information for a [byte](https://extranet.abas.de/sub_de/help/he/html/2.6.35.4.html) (K*,GRN*). */
export type ByteType = NumberType;

/** Type information for a [chart](https://extranet.abas.de/sub_de/help/he/html/2.6.35.8.html#2.6.35.14) (CH). */
export type ChartType = ErpType;

/** Type information for a [date time](https://extranet.abas.de/sub_de/help/he/html/2.6.35.7.html) (GD*). */
export type DateTimeType = DateType;

/** Type information for a [date](https://extranet.abas.de/sub_de/help/he/html/2.6.35.7.html) (SD*,GD*,ARTD*). */
export type DateType = UtilRequiredKeys<ErpType, '_type'> & {
  _type: string;
};

/** Type information for a [double](https://extranet.abas.de/sub_de/help/he/html/2.6.35.4.html). */
export type DoubleType = NumberType & {
  /** @format int32 */
  fractionDigits?: number;
  intGrouping?: boolean;
  trailingZeros?: boolean;
  /** @format int32 */
  intDigits?: number;
  positiveOnly?: boolean;
  blankWhenZero?: boolean;
};

export interface EnumPosition {
  /** @format int32 */
  code?: number;
  text: string;
  universal: string;
  briefDescription: string;
  identifier: string;
  languageIndependent: string;
}

/** Type information for an [enumeration reference](https://extranet.abas.de/sub_de/help/he/html/2.6.35.12.html) (AZ*). */
export type EnumReferenceType = ReferenceType & {
  positions: EnumPosition[];
  actualTypeName?: string;
  className?: string;
  emptyAllowed: boolean;
  id?: string;
  /** @format int32 */
  maxPosBriefDescriptionLength?: number;
  /** @format int32 */
  maxPosLength?: number;
};

/** Type information for an [enumeration](https://extranet.abas.de/sub_de/help/he/html/2.6.35.9.html) (A*,TAZ). */
export type EnumerationType = ErpType & {
  positions: EnumPosition[];
  actualTypeName?: string;
  className?: string;
  emptyAllowed?: boolean;
  id?: string;
  /** @format int32 */
  maxPosBriefDescriptionLength?: number;
  /** @format int32 */
  maxPosLength?: number;
};

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpTypeInfo {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpTypeInfo;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseErpTypeInfo {
  /** Information about an erp type. See also [EDP GTI Command](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.4.html#300.17.2.3.4.17). */
  data: ErpTypeInfo;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

export interface ErpType {
  _type: string;
}

/** Information about an erp type. See also [EDP GTI Command](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.4.html#300.17.2.3.4.17). */
export interface ErpTypeInfo {
  links?: Link[];
  detail:
    | BooleanType
    | ButtonType
    | ChartType
    | DateType
    | DateTimeType
    | EnumerationType
    | FiscalYearType
    | FreetextType
    | ByteType
    | DoubleType
    | IntegerType
    | ShortType
    | PeriodType
    | ReferenceType
    | EnumReferenceType
    | RowReferenceType
    | StringType
    | HiddenTextType
    | TimeType
    | WeekType;
  actualType: string;
  /** @format int32 */
  maxLength: number;
  multiline: boolean;
  /** @format int32 */
  maxLineLength: number;
  /** The erp type this is based on. */
  erpType: string;
  /** Base type for `erpType`. */
  baseType:
    | 'BOOLEAN'
    | 'BUTTON'
    | 'BYTE'
    | 'CHART'
    | 'DATE'
    | 'DATETIME'
    | 'DOUBLE'
    | 'ENUMERATION'
    | 'ENUMREFERENCE'
    | 'FISCAL_YEAR'
    | 'FREETEXT'
    | 'INTEGER'
    | 'PERIOD'
    | 'REFERENCE'
    | 'ROWREFERENCE'
    | 'SHORT'
    | 'STRING'
    | 'TIME'
    | 'UNKNOWN'
    | 'WEEK'
    | 'HIDDEN_TEXT';
}

/** Type information for a [fiscal year](https://extranet.abas.de/sub_de/help/he/html/2.6.35.7.html) (GJ,GJ4). */
export type FiscalYearType = ErpType;

/** Type information for a [free text](https://extranet.abas.de/sub_de/help/he/html/2.6.35.1.html) (TN*,ARTF*). */
export type FreetextType = ErpType & {
  filename: boolean;
};

/** Type information for a hidden text. */
export type HiddenTextType = StringType;

/** Type information for an [integer](https://extranet.abas.de/sub_de/help/he/html/2.6.35.4.html) (I*). */
export type IntegerType = NumberType & {
  /** @format int32 */
  intDigits?: number;
  positiveOnly?: boolean;
  blankWhenZero?: boolean;
};

/** Type information for a number. */
export type NumberType = UtilRequiredKeys<ErpType, '_type'> & {
  _type: string;
};

/** Type information for a [period](https://extranet.abas.de/sub_de/help/he/html/2.6.35.7.html) (GP*). */
export type PeriodType = ErpType;

/** Type information for a [reference](https://extranet.abas.de/sub_de/help/he/html/2.6.35.6.html) (V*,L*,P*,C*,ID*). */
export type ReferenceType = UtilRequiredKeys<ErpType, '_type'> & {
  possibleTargets: TargetTable[];
  oneDatabase: boolean;
  echoType?: 'NUMBER' | 'SEARCHWORD' | 'REF' | 'UNKNOWN';
  /** @format int32 */
  echoLength?: number;
  _type: string;
};

/** Type information for a row reference (IDZ). */
export type RowReferenceType = ErpType;

/** Type information for a [short](https://extranet.abas.de/sub_de/help/he/html/2.6.35.4.html). */
export type ShortType = NumberType;

/** Type information for a [string](https://extranet.abas.de/sub_de/help/he/html/2.6.35.5.html) (GL*,T*,NT*,...). */
export type StringType = UtilRequiredKeys<ErpType, '_type'> & {
  _type: string;
};

export interface TargetTable {
  tableName: string;
  /** Link to a related resource, e.g. an editor command, an action, or a subresource. */
  link: Link;
}

/** Type information for time (Z). */
export type TimeType = ErpType;

/** Type information for a [week](https://extranet.abas.de/sub_de/help/he/html/2.6.35.7.html) (SDW*,GW*). */
export type WeekType = ErpType;

export interface ColumnMeta {
  /** Field name. */
  name: string;
  /** Field name in German. */
  germanName: string;
  /** Field name in English. */
  englishName?: string;
  type: ColumnTypeMeta;
  originalType?: ColumnTypeMeta;
  /** Primary field name. */
  primaryColumnName?: string;
  /**
   * Priority from which the field content will be displayed.
   * @example "A"
   */
  displayPriority: 'EmptyEntry' | 'NoPrio' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'MAX_PLUS_ONE';
  /**
   * Priority from which the field can be edited.
   * @example "A"
   */
  editPriority: 'EmptyEntry' | 'NoPrio' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'MAX_PLUS_ONE';
  /** Field description. */
  description?: string;
  /** Displayed field meaning. */
  meaning?: string;
  /**
   * Flag if the field is a skip field.
   * @example false
   */
  skip: boolean;
  /**
   * Flag if the field content can be selected.
   * @example true
   */
  selectable: boolean;
  /**
   * Flag if the field has an alias.
   * @example true
   */
  alias: boolean;
  /**
   * Flag if the field is in the table selection.
   * @example false
   */
  tableColumn: boolean;
  /**
   * Flag if the field has constraint.
   * @example false
   */
  hasConstraint: boolean;
}

export interface ColumnTypeMeta {
  links?: Link[];
  /**
   * Field type in ERP client.
   * @example "A118"
   */
  erpType: string;
  /**
   * Base field type.
   * @example "ENUMERATION"
   */
  baseType:
    | 'BOOLEAN'
    | 'BUTTON'
    | 'BYTE'
    | 'CHART'
    | 'DATE'
    | 'DATETIME'
    | 'DOUBLE'
    | 'ENUMERATION'
    | 'ENUMREFERENCE'
    | 'FISCAL_YEAR'
    | 'FREETEXT'
    | 'INTEGER'
    | 'PERIOD'
    | 'REFERENCE'
    | 'ROWREFERENCE'
    | 'SHORT'
    | 'STRING'
    | 'TIME'
    | 'UNKNOWN'
    | 'WEEK'
    | 'HIDDEN_TEXT';
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseReferenceTypeFieldList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseReferenceTypeFieldList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseReferenceTypeFieldList {
  /** List of field for a reference type. */
  data: ReferenceTypeFieldList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** List of field for a reference type. */
export interface ReferenceTypeFieldList {
  /**
   * The identifier/class name of the abas ERP object (database:group / infosystem / reference fields).
   * @example "Product, SalesActivities, etc."
   */
  name?: string;
  links?: Link[];
  fields?: ColumnMeta[];
  /**
   * Flag if abas ERP object has table records.
   * @example true
   */
  withTable: boolean;
  /**
   * The identifier/class name of the abas ERP object (database:group / infosystem / reference fields).
   * @example "EDICustomerVendorInformation, (634,65,0), 118"
   */
  id?: string;
  /**
   * The metadata version of the abas ERP object (database:group / infosystem / reference fields).
   * @example "2021020720275400000288"
   */
  version?: string;
  /** The erp type this is based on. */
  erpType: string;
  /** Base type for `erpType`. */
  baseType:
    | 'BOOLEAN'
    | 'BUTTON'
    | 'BYTE'
    | 'CHART'
    | 'DATE'
    | 'DATETIME'
    | 'DOUBLE'
    | 'ENUMERATION'
    | 'ENUMREFERENCE'
    | 'FISCAL_YEAR'
    | 'FREETEXT'
    | 'INTEGER'
    | 'PERIOD'
    | 'REFERENCE'
    | 'ROWREFERENCE'
    | 'SHORT'
    | 'STRING'
    | 'TIME'
    | 'UNKNOWN'
    | 'WEEK'
    | 'HIDDEN_TEXT';
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseOpenEditor {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseOpenEditor;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseOpenEditor {
  /** Open an editor. See more details about EDI commands [here](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.6) and about database commands [here](https://extranet.abas.de/sub_de/help/he/html/28B.2.html) */
  data: OpenEditor;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpTypeCommandsList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpTypeCommandsList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseErpTypeCommandsList {
  /** A list of metadata of all available type commands. */
  data: ErpTypeCommandsList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Metadata of a type command. */
export interface ErpTypeCommand {
  /**
   * Type command name.
   * @example "(AvailabilityCheck)"
   */
  name: string;
  /**
   * Type command description.
   * @example "AvailabilityCheck"
   */
  description: string;
  /**
   * Type command number.
   * @format int32
   * @example 50
   */
  number: number;
}

/** A list of metadata of all available type commands. */
export interface ErpTypeCommandsList {
  commands?: ErpTypeCommand[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeSearchEngineConfiguration {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** The configuration the REST API uses for establishing a connection to the search engine for a particular client. */
  content: SearchEngineConfiguration;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** The configuration the REST API uses for establishing a connection to the search engine for a particular client. */
export interface SearchEngineConfiguration {
  /** Indicates whether the search engine is configured for the client. */
  configured?: boolean;
  /**
   * The search engine host name configured by the <code>VTS_HOSTNAME</code> environment variable. If that is not set, the host name of the ERP will be returned instead.
   * @example ""lucene.intranet""
   */
  backendHost: string;
  /**
   * The search engine host port number configured by the <code>VTS_PORT</code> environment variable.
   * @format int32
   * @example 12000
   */
  backendPort?: number;
  /**
   * A concatenation of the <code>backendHost</code> and, optionally, the <code>backendPort</code> property values.
   * @example ""lucene.intranet:12000""
   */
  backendHostAndPort: string;
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpDbGroupDescriptorList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpDbGroupDescriptorList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/**
 * The metadata of an abas ERP database and group.
 * Follow the <code>link</code> property for more metadata (e.g. the fields metadata)
 */
export interface ErpDbGroupDescriptor {
  /**
   * The identifier/class name of the abas ERP group in the database.
   * @example "EDICustomerVendorInformation"
   */
  id: string;
  /**
   * The identifier/class name of the abas ERP database.
   * @example "Customer"
   */
  dbId: string;
  /**
   * The version of the abas ERP database:group (field : versionn)
   * @example "2021020720275400000288"
   */
  version: string;
  /**
   * The name of the group in a database.
   * @example "EDICustomerVendorInformation"
   */
  name: string;
  /**
   * The description of the group.
   * @example "EDI customer/vendor information"
   */
  description: string;
  /**
   * The abas ERP table (database:group).
   * @example "0:6"
   */
  tableSpec: string;
  /** Link to a related resource, e.g. an editor command, an action, or a subresource. */
  link?: Link;
}

/** The list of metadata about the abas ERP databases and groups. */
export interface ErpDbGroupDescriptorList {
  erpDbGroups?: ErpDbGroupDescriptor[];
}

/** A generic response. */
export interface ErpResponseErpDbGroupDescriptorList {
  /** The list of metadata about the abas ERP databases and groups. */
  data: ErpDbGroupDescriptorList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpDbTableMeta {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpDbTableMeta;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** The metadata of an abas ERP table (database:group). */
export interface ErpDbTableMeta {
  /**
   * The identifier/class name of the abas ERP object (database:group / infosystem / reference fields).
   * @example "Product, SalesActivities, etc."
   */
  name?: string;
  links?: Link[];
  fields?: ColumnMeta[];
  /**
   * Flag if abas ERP object has table records.
   * @example true
   */
  withTable: boolean;
  /**
   * The identifier/class name of the abas ERP object (database:group / infosystem / reference fields).
   * @example "EDICustomerVendorInformation, (634,65,0), 118"
   */
  id?: string;
  /**
   * The metadata version of the abas ERP object (database:group / infosystem / reference fields).
   * @example "2021020720275400000288"
   */
  version?: string;
  /**
   * The identifier/class name of the abas ERP database group.
   * @example "EDICustomerVendorInformation"
   */
  dbId: string;
  /**
   * The abas ERP table (database:group).
   * @example "0:6"
   */
  tableSpec: string;
  /**
   * The description of the group.
   * @example "EDI customer/vendor information"
   */
  description: string;
  /**
   * Flag if abas ERP database group is selectable (those that might be used in a query).
   * @example true
   */
  selectable: boolean;
  /**
   * Flag if abas ERP database group has identifiable records (with identity number and search word).
   * @example true
   */
  identifiable: boolean;
  /**
   * Flag if abas ERP database group has editable records.
   * @example true
   */
  editable: boolean;
  /**
   * Flag if abas ERP database group is defined in the additional databases.
   * @example true
   */
  additional: boolean;
  /**
   * Flag if abas ERP database group contains masterdata.
   * @example true
   */
  masterdata?: boolean;
  /**
   * Flag if abas ERP database group can contain only one object.
   * @example true
   */
  singleObject?: boolean;
  /**
   * Flag if abas ERP database group has a persistent header records.
   * @example true
   */
  headPersistent?: boolean;
  /**
   * Flag if abas ERP database group has quoted header.
   * @example true
   */
  headQuoted?: boolean;
  /**
   * Flag if abas ERP database group has a persistent table.
   * @example true
   */
  tablePersistent?: boolean;
  /**
   * Flag if abas ERP database group has quoted table.
   * @example true
   */
  tableQuoted?: boolean;
}

/** A generic response. */
export interface ErpResponseErpDbTableMeta {
  /** The metadata of an abas ERP table (database:group). */
  data: ErpDbTableMeta;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpCallParameters {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpCallParameters;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** Call Parameters used in abas ERP in a screen to call some other screen (data or infosystem). */
export interface ErpCallParameter {
  /**
   * The id of this call parameter.
   * @example "50085"
   */
  id: string;
  /**
   * The name of this call parameter.
   * @example "Create a shipping plan"
   */
  name: string;
  /**
   * Flag specifying that the call parameter is meant for table records in the source object.
   * @example false
   */
  table?: boolean;
  /**
   * The destination object for the call parameter.
   * @example "obj:data:3:22"
   */
  destObjectType: string;
  /** The link(s) for the call parameter. The "via" link in particular would point to the data record of this call parameter. */
  links?: Link[];
  /** Flag specifying that this is a common call parameter (i.e. when true "kontexttyp = AllTablesOfVariables or AllInfosystems" or when false "kontexttyp = SingleTableOfVariables or SingleInfosystem") */
  common: boolean;
  /** Flag specifying that this is a custom call parameter (i.e. the value of "lieferumfang"). */
  custom: boolean;
}

/** A list of abas ERP Call parameters metadata. */
export interface ErpCallParameters {
  callParameters?: ErpCallParameter[];
}

/** A generic response. */
export interface ErpResponseErpCallParameters {
  /** A list of abas ERP Call parameters metadata. */
  data: ErpCallParameters;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpDbCommandsList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpDbCommandsList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** Metadata of an abas ERP database command. */
export interface ErpDbCommand {
  /**
   * The abas ERP database.
   * @format int32
   * @example 0
   */
  db: number;
  /**
   * The identifier/class name of the abas ERP database.
   * @example "Customer"
   */
  dbId: string;
  /**
   * The abas ERP database group.
   * @format int32
   * @example 6
   */
  group: number;
  /**
   * The identifier/class name of the abas ERP database group.
   * @example "Prospect"
   */
  groupId: string;
  /**
   * Flag if database command has to be executed in context of an object.
   * @example false
   */
  withObject: boolean;
  /**
   * An ERP Edit Action.
   * @example "UPDATE"
   */
  editAction:
    | 'DONE'
    | 'GET'
    | 'RELEASE'
    | 'DELIVERY'
    | 'INVOICE'
    | 'PAYMENT'
    | 'REVERSAL'
    | 'CALCULATE'
    | 'TRANSFER'
    | 'DELETE'
    | 'VIEW'
    | 'UPDATE'
    | 'NEW'
    | 'COPY'
    | 'MODIFY'
    | 'STORE'
    | 'REMOVE'
    | 'DO'
    | 'RETURN';
  /**
   * The database command string to execute the edit action.
   * @example "<(Customer)>'NS'<(Edit)>,(Prospect)"
   */
  commandString: string;
}

export interface ErpDbCommandsList {
  /** A list of abas ERP database commands. */
  commands?: ErpDbCommand[];
}

/** A generic response. */
export interface ErpResponseErpDbCommandsList {
  data: ErpDbCommandsList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpSingleValue {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpSingleValue;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/** A generic response. */
export interface ErpResponseErpSingleValue {
  /** Contains the metadata and value of a field in ERP. */
  data: ErpSingleValue;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Contains the metadata and value of a field in ERP. */
export interface ErpSingleValue {
  /** The metadata associated with an ERP data object. */
  meta: ErpDataObjectMeta;
  links?: Link[];
  result: ExtendedFieldValueContainer | Field;
}

/** Envelope for a REST API response.  */
export interface EnvelopeError {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  content: Error;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

export interface Error {
  /** An informational message or a message describing the cause of an error. */
  error: Message;
  details?: Message[];
  location?: string;
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpInfosystemDescriptorList {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpInfosystemDescriptorList;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/**
 * Metadata for an ERP infosystem.
 * Follow the <code>link</code> to the infosystem resource.
 */
export interface ErpInfosystemDescriptor {
  /**
   * The infosystem's name
   * @example "PurchasingActivities"
   */
  name: string;
  /** Link to a related resource, e.g. an editor command, an action, or a subresource. */
  link?: Link;
  /**
   * The infosystem's ID.
   * @example "(634,65,0)"
   */
  id?: string;
  /** The infosystem's version. */
  version?: string;
  /**
   * The infosystem's identity number.
   * @example "10294"
   */
  identNumber: string;
  /**
   * The infosystem's workspace
   * @example "vk"
   */
  workspace: string;
  /**
   * The infosystem's search word.
   * @example "VKZENTRALE"
   */
  searchWord: string;
  /**
   * The infosystem's description.
   * @example "Sales activities"
   */
  description: string;
  /**
   * The infosystem's priority.
   * @example "A"
   */
  priority: 'EmptyEntry' | 'NoPrio' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'MAX_PLUS_ONE';
  /**
   * The infosystem's class name.
   * @example "SalesActivities"
   */
  className: string;
  /**
   * Is the infosystem a standard one?
   * @example true
   */
  standard: boolean;
}

/** Lists with metadata for all ERP infosystems. */
export interface ErpInfosystemDescriptorList {
  erpInfosystems?: ErpInfosystemDescriptor[];
}

/** A generic response. */
export interface ErpResponseErpInfosystemDescriptorList {
  /** Lists with metadata for all ERP infosystems. */
  data: ErpInfosystemDescriptorList;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpInfosystemMeta {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpInfosystemMeta;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

export interface ErpInfosystemMeta {
  /**
   * The identifier/class name of the abas ERP object (database:group / infosystem / reference fields).
   * @example "Product, SalesActivities, etc."
   */
  name?: string;
  links?: Link[];
  fields?: ColumnMeta[];
  /**
   * Flag if abas ERP object has table records.
   * @example true
   */
  withTable: boolean;
  /**
   * The identifier/class name of the abas ERP object (database:group / infosystem / reference fields).
   * @example "EDICustomerVendorInformation, (634,65,0), 118"
   */
  id?: string;
  /**
   * The metadata version of the abas ERP object (database:group / infosystem / reference fields).
   * @example "2021020720275400000288"
   */
  version?: string;
  /**
   * The infosystem's identity number.
   * @example "10294"
   */
  identNumber: string;
  /**
   * The infosystem's workspace
   * @example "vk"
   */
  workspace: string;
  /**
   * The infosystem's search word.
   * @example "VKZENTRALE"
   */
  searchWord: string;
  /**
   * The infosystem's description.
   * @example "Sales activities"
   */
  description: string;
  /**
   * The infosystem's priority.
   * @example "A"
   */
  priority: 'EmptyEntry' | 'NoPrio' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'MAX_PLUS_ONE';
  /**
   * The infosystem's class name.
   * @example "SalesActivities"
   */
  className: string;
  /**
   * Flag if the infosystem a standard one.
   * @example true
   */
  standard: boolean;
}

/** A generic response. */
export interface ErpResponseErpInfosystemMeta {
  data: ErpInfosystemMeta;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/** Envelope for a REST API response.  */
export interface EnvelopeErpResponseErpAbout {
  /** Metadata associated with an Envelope. */
  meta: Meta;
  /** A generic response. */
  content: ErpResponseErpAbout;
  /** The protocol version of the REST API. */
  protocolVersion: string;
}

/**
 * Information about an erp client (mandant).
 *
 *
 *
 * `erpClientName` contains the value of the environment variable `MANDANT` in abas Essentials.
 *
 * `erpClientId` contains the value of the environment variable `MNAME` in abas Essentials.
 *
 * `erpGuiDDEServerName` contains the value of the environment variable `DDESERVERNAME` in abas Essentials.
 *
 * `erpVersion` contains the value of the edp session option `ABASVERSION`.
 *
 * `erpVersionNumber` contains the value of the edp session option `ABASVERSNUM`.
 *
 * `erpVersionName` contains the value of the edp session option `ABASVERSNAME`.
 *
 * `erpTimeZone` contains the value of the edp session option `TIMEZONE`.
 *
 * `erpDateTime` contains the value of the edp session option `DATE`.
 *
 *
 *
 * See [EDP SHO](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.3.html#300.17.2.3.3.5) for more information about edp session options.
 */
export interface ErpAbout {
  erpClientName: ExtendedFieldValueContainer | Field;
  erpClientId: ExtendedFieldValueContainer | Field;
  erpGuiDDEServerName: ExtendedFieldValueContainer | Field;
  erpVersion: ExtendedFieldValueContainer | Field;
  erpVersionNumber: ExtendedFieldValueContainer | Field;
  erpVersionName: ExtendedFieldValueContainer | Field;
  erpTimeZone: ExtendedFieldValueContainer | Field;
  erpDateTime: ExtendedFieldValueContainer | Field;
  /** Erp licensing information. */
  erpLicenseInfo: ErpLicenseInfo;
  erpOperatingLanguages: ErpLanguage[];
  erpFeatures: ErpFeature[];
  erpEnvironmentVariables: ErpEnvironmentVariable[];
}

/** Name and value for a configured environment variable in an abas essentials client. */
export interface ErpEnvironmentVariable {
  name: string;
  value?: string;
}

/** Metadata for a feature that may or may not be supported in abas essentials. */
export interface ErpFeature {
  /** The ID of the this feature. */
  id:
    | 'BLOCKING_ACTIONS'
    | 'BLOCKING_DIALOGS'
    | 'LICENSE_TYPES'
    | 'RENEW_BLOCKING_ACTION_TIMEOUT'
    | 'PC_COPY_UPLOAD'
    | 'HEAD_TABLE_FIELDS_COMBINED_QUERY';
  /** Is this feature supported by this abas essentials client? */
  supported?: boolean;
  /** The version of the feature. */
  version?: string;
}

/** Metadata for an installed language. */
export interface ErpLanguage {
  /**
   * Code of the locale. e.g. `en_US`.
   * @example "en_US"
   */
  code?: string;
  /**
   * Code of the effective locale. If you configured `de.abas.mw.core.language.replacement.*` this can differ from `code`.
   * @example "en_US"
   */
  erpCode?: string;
  /**
   * The abas essentials short code.
   * @example "A"
   */
  erpCodeShort?: string;
  /**
   * The IETF BCP 47 language tag. e.g.
   * @example "en_US"
   */
  languageTag?: string;
}

/** Erp licensing information. */
export interface ErpLicenseInfo {
  licensingMode: 'CC_USER' | 'CC_SCREENS';
}

/** A generic response. */
export interface ErpResponseErpAbout {
  /**
   * Information about an erp client (mandant).
   *
   *
   *
   * `erpClientName` contains the value of the environment variable `MANDANT` in abas Essentials.
   *
   * `erpClientId` contains the value of the environment variable `MNAME` in abas Essentials.
   *
   * `erpGuiDDEServerName` contains the value of the environment variable `DDESERVERNAME` in abas Essentials.
   *
   * `erpVersion` contains the value of the edp session option `ABASVERSION`.
   *
   * `erpVersionNumber` contains the value of the edp session option `ABASVERSNUM`.
   *
   * `erpVersionName` contains the value of the edp session option `ABASVERSNAME`.
   *
   * `erpTimeZone` contains the value of the edp session option `TIMEZONE`.
   *
   * `erpDateTime` contains the value of the edp session option `DATE`.
   *
   *
   *
   * See [EDP SHO](https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.3.html#300.17.2.3.3.5) for more information about edp session options.
   */
  data: ErpAbout;
  /** Messages for this erp response. */
  messages: (ErpMessage | ErpProgressMessage)[];
}

/**
 * HtmlPage
 * An html response page.
 * @example "<html><body>text</body></html>"
 */
export type HtmlPage = string;

/**
 * AbasObjectsJson
 * This schema is not machine generate-able currently. Please refer to "API Guide" [here](https://extranet.abas.de/sub_de/abas-business-suite/erp/apis-tools/middleware/html5/api-guide.html#erp-accept-headers) and use the schema generated for `application/json` as a guideline to create a valid json string.
 */
export type AbasObjectsJson = object;

/**
 * AbasObjectsSimpleJson
 * This schema is not machine generate-able currently. Please refer to "API Guide" [here](https://extranet.abas.de/sub_de/abas-business-suite/erp/apis-tools/middleware/html5/api-guide.html#erp-accept-headers) and use the schema generated for `application/json` as a guideline to create a valid json string.
 */
export type AbasObjectsSimpleJson = object;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'http://10.254.99.102:8920/mw';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;
    // console.log("Request: ", `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`);
    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      
      const r = response as HttpResponse<T, E>;
      //console.log("Rsponse: ", r);
      r.data = null as unknown as T;
      r.error = null as unknown as E;
      
      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              console.log('Error1:',e, r);
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title abas ERP Rest API
 * @version 1.2.0
 * @baseUrl http://10.254.99.102:8920/mw
 *
 * This is the Restful API server for the abas ERP system. You can find out more about abas-ERP at [https://abas-erp.com](https://abas-erp.com).
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  r = {
    /**
     * @description Get the complete contents of a freetext table field. Freetext fields have a link with rel "via" that links to here.
     *
     * @tags Workspace
     * @name GetTableValue
     * @summary Get the value of a freetext table field.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/value
     */
    getTableValue: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      rowSpec: string,
      fieldName: string,
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/table/${rowSpec}/${fieldName}/value`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description Set the value of a table field. Freetext fields have a link with rel "via" that links to here.
     *
     * @tags Workspace
     * @name PutTableValue
     * @summary Set the value of a table field.
     * @request PUT:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/value
     */
    putTableValue: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      rowSpec: string,
      fieldName: string,
      data: HtmlPage,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/table/${rowSpec}/${fieldName}/value`,
        method: 'PUT',
        query: query,
        body: data,
        type: ContentType.Text,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get the complete contents of a freetext header field. Freetext fields have a link with rel "via" that links to here.
     *
     * @tags Workspace
     * @name GetHeadValue
     * @summary Get the value of a freetext header field.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/value
     */
    getHeadValue: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      fieldName: string,
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/head/${fieldName}/value`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description Set the value of a header field. Freetext fields have a link with rel "via" that links to here.
     *
     * @tags Workspace
     * @name PutHeadValue
     * @summary Set the value of a header field.
     * @request PUT:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/value
     */
    putHeadValue: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      fieldName: string,
      data: HtmlPage,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/head/${fieldName}/value`,
        method: 'PUT',
        query: query,
        body: data,
        type: ContentType.Text,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workspace
     * @name GetSettings
     * @summary Get settings of this working set.
     * @request GET:/r/{clientId}/workspace/{workingSet}/settings
     */
    getSettings: (clientId: string, workingSet: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseWorkingSetSettings, any>({
        path: `/r/${clientId}/workspace/${workingSet}/settings`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workspace
     * @name SetSettings
     * @summary Change settings of this working set.
     * @request PUT:/r/{clientId}/workspace/{workingSet}/settings
     */
    setSettings: (clientId: string, workingSet: string, data: WorkingSetSettings, params: RequestParams = {}) =>
      this.request<StreamingResponseBody, any>({
        path: `/r/${clientId}/workspace/${workingSet}/settings`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all working sets for the current user.
     *
     * @tags Workspace
     * @name Get1
     * @summary List working sets.
     * @request GET:/r/{clientId}/workspace
     */
    get1: (
      clientId: string,
      query?: {
        /** Only return working sets with this label. */
        workingSetLabel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseWorkspace, any>({
        path: `/r/${clientId}/workspace`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workspace
     * @name CreateWorkingSet
     * @summary Create a new working set.
     * @request POST:/r/{clientId}/workspace
     */
    createWorkingSet: (
      clientId: string,
      query?: {
        /** Use this label for the new working set. */
        workingSetLabel?: string;
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /** Use this id for the new working set. <br/><b>Note</b> This parameter is intended for test. */
        workingSetId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/r/${clientId}/workspace`,
        method: 'POST',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workspace
     * @name Get2
     * @summary Get information about working set.
     * @request GET:/r/{clientId}/workspace/{workingSet}
     */
    get2: (clientId: string, workingSet: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseWorkingSet, any>({
        path: `/r/${clientId}/workspace/${workingSet}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new uninitialized editor. This is useful to subscribe to editor events before opening it. After that it can be opened via the INIT resource, or passed to one of the command resources via the "editorId" query parameter.
     *
     * @tags Workspace
     * @name CreateEditor
     * @summary Create a new working set editor.
     * @request POST:/r/{clientId}/workspace/{workingSet}
     */
    createEditor: (
      clientId: string,
      workingSet: string,
      query?: {
        /** Use this ID for the new editor. <br/><b>Note</b> This parameter is intended for tests. */
        editorId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<StreamingResponseBody, any>({
        path: `/r/${clientId}/workspace/${workingSet}`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get current field values, etc. of the editor.
     *
     * @tags Workspace
     * @name GetWipObject
     * @summary Get current state of the editor.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}
     */
    getWipObject: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @example "*"
         */
        tableFields?: string;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Apply multiple commands to the editor. For example, change fields or append rows. Returns values of (directly or indirectly) changed fields.
     *
     * @tags Workspace
     * @name ExecuteOnWipObject
     * @summary Apply commands to an editor.
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}
     */
    executeOnWipObject: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      data: EditorCommandList,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a list of all printable layouts and printers for the dataset in the working set editor. It shows more layouts then in the GUI screen. The user must have the following ERP permissions to access this resource: * Permission for type command number "43".
     *
     * @tags Workspace, Print
     * @name GetLayouts
     * @summary Get a List of all printable layouts and printers for the database record in the working set editor.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/print
     */
    getLayouts: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      query?: {
        /** Context row. */
        rowSpec?: string;
        /** Filter by layout. */
        layout?: string;
        /** Filter by printer. */
        printer?: string;
        /**
         * Filter by file type.
         * @default "pdf"
         */
        fileType?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpPrintLayoutList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/print`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Print a database record in the working set editor using default print settings. The specific print settings are controlled with the request body. The response includes a link to the generated file. The user must have the following ERP permissions to access this resource: * Permission for type command number "43".
     *
     * @tags Workspace, Print
     * @name Print
     * @summary Print the database record in the working set editor.
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/print
     */
    print: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      data: ErpPrintParameters,
      query?: {
        /** Context row. */
        rowSpec?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/print`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Use the search engine to search for possible field values. Results are restricted to possible values for this field. Reference fields have a link with rel "urn:abas:rel:search:obj" that links to here.
     *
     * @tags Workspace, Search
     * @name GetSearchResult
     * @summary Search for possible values for a reference table field.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/search
     */
    getSearchResult: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      rowSpec: string,
      fieldName: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Use kernel filter that will apply business logic restrictions to the search results. This will slow down the request, but filter out more records.
         * @default false
         */
        enableErpKernelFilter?: boolean;
        /**
         * Response format. "SE" for the native search engine response or "ERP" for the normal response format of this Rest API.
         * @default "ERP"
         */
        format?: 'ERP' | 'SE';
        /**
         * Search engine query mode.
         * @default "DEFAULT"
         */
        mode?: 'DEFAULT' | 'PREFIX';
        /** Index number. The default value for this parameter is configured in the search service config file in the "abasconfig" directory.  */
        index?: string;
        /**
         * If this parameter is true, the full text search service response will be parsed for highlighting information and a list of matching keywords will be created and delivered.
         * @default false
         */
        keywords?: boolean;
        /** Query expression */
        query?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "-"
         * @example "*"
         */
        tableFields?: string;
        /**
         * Maximum number of items to retrieve. If limit is 0, all objects are returned.
         * @format int32
         * @default 20
         */
        limit?: number;
        /**
         * Result offset (for example, for paging). This is the number of items to skip in the result. If the total number of available items exceeds the limit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 0
         */
        offset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 1
         */
        tableOffset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseSearchResultErpDataObjectList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/table/${rowSpec}/${fieldName}/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Use the search engine to search for possible field values. Results are restricted to possible values for this field. Reference fields have a link with rel "urn:abas:rel:search:obj" that links to here.
     *
     * @tags Workspace, Search
     * @name Search
     * @summary Search for possible values for a reference table field.
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/search
     */
    search: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      rowSpec: string,
      fieldName: string,
      data: SearchEngineQuery,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Use kernel filter that will apply business logic restrictions to the search results. This will slow down the request, but filter out more records.
         * @default false
         */
        enableErpKernelFilter?: boolean;
        /**
         * Response format. "SE" for the native search engine response or "ERP" for the normal response format of this Rest API.
         * @default "ERP"
         */
        format?: 'ERP' | 'SE';
        /**
         * Search engine query mode.
         * @default "DEFAULT"
         */
        mode?: 'DEFAULT' | 'PREFIX';
        /** Index number. The default value for this parameter is configured in the search service config file in the "abasconfig" directory.  */
        index?: string;
        /**
         * If this parameter is true, the full text search service response will be parsed for highlighting information and a list of matching keywords will be created and delivered.
         * @default false
         */
        keywords?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseSearchResultErpDataObjectList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/table/${rowSpec}/${fieldName}/search`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Buttons that open an editor have a link with rel "urn:abas:rel:subEditor" or "urn:abas:rel:subEditor:printDialog" that links to here.
     *
     * @tags Workspace
     * @name OpenSubEditor
     * @summary Open a subeditor with a table button.
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/commands/SUBEDIT
     */
    openSubEditor: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      rowSpec: string,
      fieldName: string,
      data: SubEditorInitCommandExtension,
      query?: {
        /** Use an existing editor for this operation. If no editor with that name can be found, a new one will be created. */
        editorId?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterTableFields?: string;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Sets whether the editor should report all field changes. This includes fields changed by the user as well as fields changed by the server as a result.
         * @default true
         */
        cn?: boolean;
        /**
         * Set this to "false" if you don't want the editor started immediately with the request because you need do something with the editor before that. For example, if you want to start listening to SSE events first.
         * @default true
         */
        start?: boolean;
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/table/${rowSpec}/${fieldName}/commands/SUBEDIT`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Use the search engine to search for possible field values. Results are restricted to possible values for this field. Reference fields have a link with rel "urn:abas:rel:search:obj" that links to here.
     *
     * @tags Workspace, Search
     * @name GetSearchResult1
     * @summary Search for possible values for a reference header field.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/search
     */
    getSearchResult1: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      fieldName: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Use kernel filter that will apply business logic restrictions to the search results. This will slow down the request, but filter out more records.
         * @default false
         */
        enableErpKernelFilter?: boolean;
        /**
         * Response format. "SE" for the native search engine response or "ERP" for the normal response format of this Rest API.
         * @default "ERP"
         */
        format?: 'ERP' | 'SE';
        /**
         * Search engine query mode.
         * @default "DEFAULT"
         */
        mode?: 'DEFAULT' | 'PREFIX';
        /** Index number. The default value for this parameter is configured in the search service config file in the "abasconfig" directory.  */
        index?: string;
        /**
         * If this parameter is true, the full text search service response will be parsed for highlighting information and a list of matching keywords will be created and delivered.
         * @default false
         */
        keywords?: boolean;
        /** Query expression */
        query?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "-"
         * @example "*"
         */
        tableFields?: string;
        /**
         * Maximum number of items to retrieve. If limit is 0, all objects are returned.
         * @format int32
         * @default 20
         */
        limit?: number;
        /**
         * Result offset (for example, for paging). This is the number of items to skip in the result. If the total number of available items exceeds the limit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 0
         */
        offset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 1
         */
        tableOffset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseSearchResultErpDataObjectList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/head/${fieldName}/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Use the search engine to search for possible field values. Results are restricted to possible values for this field. Reference fields have a link with rel "urn:abas:rel:search:obj" that links to here.
     *
     * @tags Workspace, Search
     * @name Search1
     * @summary Search for possible values for a reference header field.
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/search
     */
    search1: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      fieldName: string,
      data: SearchEngineQuery,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Use kernel filter that will apply business logic restrictions to the search results. This will slow down the request, but filter out more records.
         * @default false
         */
        enableErpKernelFilter?: boolean;
        /**
         * Response format. "SE" for the native search engine response or "ERP" for the normal response format of this Rest API.
         * @default "ERP"
         */
        format?: 'ERP' | 'SE';
        /**
         * Search engine query mode.
         * @default "DEFAULT"
         */
        mode?: 'DEFAULT' | 'PREFIX';
        /** Index number. The default value for this parameter is configured in the search service config file in the "abasconfig" directory.  */
        index?: string;
        /**
         * If this parameter is true, the full text search service response will be parsed for highlighting information and a list of matching keywords will be created and delivered.
         * @default false
         */
        keywords?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseSearchResultErpDataObjectList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/head/${fieldName}/search`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Buttons that open an editor have a link with rel "urn:abas:rel:subEditor" or "urn:abas:rel:subEditor:printDialog" that links to here.
     *
     * @tags Workspace
     * @name OpenSubEditor1
     * @summary Open a subeditor with a header button.
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/commands/SUBEDIT
     */
    openSubEditor1: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      fieldName: string,
      data: SubEditorInitCommandExtension,
      query?: {
        /** Use an existing editor for this operation. If no editor with that name can be found, a new one will be created. */
        editorId?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterTableFields?: string;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Sets whether the editor should report all field changes. This includes fields changed by the user as well as fields changed by the server as a result.
         * @default true
         */
        cn?: boolean;
        /**
         * Set this to "false" if you don't want the editor started immediately with the request because you need do something with the editor before that. For example, if you want to start listening to SSE events first.
         * @default true
         */
        start?: boolean;
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/head/${fieldName}/commands/SUBEDIT`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Starts the editor that was not started yet. For example, POST on /r/{clientId}/obj/data/{table}/{id}/commands/{command}?start=false then follow the link here.
     *
     * @tags Workspace
     * @name Start
     * @summary Editor command: START
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/START
     */
    start: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      data: EditorInitCommandExtension,
      query?: {
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterTableFields?: string;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Sets whether the editor should report all field changes. This includes fields changed by the user as well as fields changed by the server as a result.
         * @default true
         */
        cn?: boolean;
        /**
         * Set this to "false" if you don't want the editor started immediately with the request because you need do something with the editor before that. For example, if you want to start listening to SSE events first.
         * @default true
         */
        start?: boolean;
        /** Editor init command as json string */
        editorInitCmd?: EditorInitCommand;
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/commands/START`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Commits the current editor and reopens it immediately after that.
     *
     * @tags Workspace
     * @name SaveAndReload
     * @summary Editor command: SAVEANDRELOAD
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/SAVEANDRELOAD
     */
    saveAndReload: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      data: EditorCloseCommandExtension,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/commands/SAVEANDRELOAD`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Release the editor and free up its resources.
     *
     * @tags Workspace
     * @name Release
     * @summary Editor command: RELEASE
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/RELEASE
     */
    release: (clientId: string, workingSet: string, workingSetEditor: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseWorkingSetEditor, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/commands/RELEASE`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * @description Initializes an empty editor.
     *
     * @tags Workspace
     * @name Init
     * @summary Editor command: START
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/INIT
     */
    init: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      data: EditorInitCommand,
      query?: {
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterTableFields?: string;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Sets whether the editor should report all field changes. This includes fields changed by the user as well as fields changed by the server as a result.
         * @default true
         */
        cn?: boolean;
        /**
         * Set this to "false" if you don't want the editor started immediately with the request because you need do something with the editor before that. For example, if you want to start listening to SSE events first.
         * @default true
         */
        start?: boolean;
        /** Editor init command as json string */
        editorInitCmd?: EditorInitCommand;
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/commands/INIT`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Commit the editor.
     *
     * @tags Workspace
     * @name Commit
     * @summary Editor command: COMMIT
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/COMMIT
     */
    commit: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      data: EditorCloseCommandExtension,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/commands/COMMIT`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Cancel the editor. All unsaved changes are lost.
     *
     * @tags Workspace
     * @name Cancel
     * @summary Editor command: CANCEL
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/CANCEL
     */
    cancel: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      data: EditorCloseCommandExtension,
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractErpResponseErpDataObject, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/commands/CANCEL`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Interrupts the current editor operation. For example, an EFOP running for a long time.
     *
     * @tags Workspace
     * @name BreakEditOperation
     * @summary Editor command: BREAKEDITOPERATION
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/BREAKEDITOPERATION
     */
    breakEditOperation: (clientId: string, workingSet: string, workingSetEditor: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/commands/BREAKEDITOPERATION`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description Notify the editor about status of a blocking action or extend the timeout.
     *
     * @tags Workspace
     * @name BlockingActionResponse
     * @summary Editor command: BA_RESPONSE
     * @request POST:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands/BA_RESPONSE
     */
    blockingActionResponse: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      data: BlockingActionClientResponse,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/commands/BA_RESPONSE`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Either close or cancel the editor.
     *
     * @tags Workspace
     * @name PostCommand
     * @summary Execute a command on the working set editor.
     * @request POST:/r/{clientId}/workspace/{workingSet}/commands/{command}
     */
    postCommand: (clientId: string, workingSet: string, command: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseWorkingSetEditorList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/commands/${command}`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workspace
     * @name Post
     * @summary Open an editor using a GUI command.
     * @request POST:/r/{clientId}/workspace/fromCMDString
     */
    post: (
      clientId: string,
      data: EditorInitCommandExtension,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /** The GUI command used to open the editor. */
        command?: string;
        /** Use an existing working set for this operation. If no working set with that name can be found, a new one will be created. */
        workingSetId?: string;
        /** Use an existing editor for this operation. If no editor with that name can be found, a new one will be created. */
        editorId?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterTableFields?: string;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Sets whether the editor should report all field changes. This includes fields changed by the user as well as fields changed by the server as a result.
         * @default true
         */
        cn?: boolean;
        /**
         * Set this to "false" if you don't want the editor started immediately with the request because you need do something with the editor before that. For example, if you want to start listening to SSE events first.
         * @default true
         */
        start?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/workspace/fromCMDString`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all documents for this context.
     *
     * @tags Workspace
     * @name GetDocuments
     * @summary List documents.
     * @request GET:/r/{clientId}/workspace/docs/{context}
     */
    getDocuments: (clientId: string, context: string, params: RequestParams = {}) =>
      this.request<EnvelopeWorkspaceDocumentList, any>({
        path: `/r/${clientId}/workspace/docs/${context}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Upload one or more workspace documents.
     *
     * @tags Workspace
     * @name PostDocument
     * @summary Upload documents.
     * @request POST:/r/{clientId}/workspace/docs/{context}
     */
    postDocument: (clientId: string, context: string, data: MultipartRequest, params: RequestParams = {}) =>
      this.request<EnvelopeWorkspaceDocumentList, any>({
        path: `/r/${clientId}/workspace/docs/${context}`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete all documents for this context.
     *
     * @tags Workspace
     * @name DeleteDocuments
     * @summary Delete documents.
     * @request DELETE:/r/{clientId}/workspace/docs/{context}
     */
    deleteDocuments: (clientId: string, context: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/r/${clientId}/workspace/docs/${context}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * @description Upload a file to the given abas client. The users must have permissions to write the file.
     *
     * @tags Miscellaneous
     * @name Upload
     * @summary Upload a file to abas ERP.
     * @request POST:/r/{clientId}/upload
     */
    upload: (
      clientId: string,
      data: MultipartRequest,
      query?: {
        /**
         * The name of the file.
         * @example "ow1/FILE.EXT"
         */
        fileName?: string;
        /** Working set ID of the editor for the "editorId" parameter. */
        workingSetId?: string;
        /** If the upload is part of a blocking action, the editor can be notified when the upload is finished. */
        editorId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/r/${clientId}/upload`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Get information about a type command like editAction, table name and type.
     *
     * @tags System Objects, Type Command
     * @name GetTypeCommand
     * @summary Get information about a type command.
     * @request GET:/r/{clientId}/sys/typeCmd/{typeCmd}
     */
    getTypeCommand: (
      clientId: string,
      typeCmd: string,
      query?: {
        /**
         * Set to "false" to see commands the current user is not permitted to use.
         * @default true
         */
        permittedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseOpenEditor, any>({
        path: `/r/${clientId}/sys/typeCmd/${typeCmd}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Invoke a type command. A working set editor is created.
     *
     * @tags System Objects, Type Command
     * @name InvokeTypeCommand
     * @summary Invoke a type command.
     * @request POST:/r/{clientId}/sys/typeCmd/{typeCmd}
     */
    invokeTypeCommand: (
      clientId: string,
      typeCmd: string,
      data: EditorInitCommandExtension,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /** Parameters for this type command. For example, for the "(Infosystem)" command this could be "LKU". */
        params?: string;
        /** Use an existing working set for this operation. If no working set with that name can be found, a new one will be created. */
        workingSetId?: string;
        /** Use an existing editor for this operation. If no editor with that name can be found, a new one will be created. */
        editorId?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterTableFields?: string;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Sets whether the editor should report all field changes. This includes fields changed by the user as well as fields changed by the server as a result.
         * @default true
         */
        cn?: boolean;
        /**
         * Set this to "false" if you don't want the editor started immediately with the request because you need do something with the editor before that. For example, if you want to start listening to SSE events first.
         * @default true
         */
        start?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/sys/typeCmd/${typeCmd}`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Search database records for the defined full text search query. The settings for the search are set in the request body.
     *
     * @tags Search
     * @name Search2
     * @summary Search database records using the full text search engine.
     * @request POST:/r/{clientId}/search
     */
    search2: (
      clientId: string,
      data: SearchEngineQuery,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Response format. "SE" for the native search engine response or "ERP" for the normal response format of this Rest API.
         * @default "ERP"
         */
        format?: 'ERP' | 'SE';
        /**
         * Search engine query mode.
         * @default "DEFAULT"
         */
        mode?: 'DEFAULT' | 'PREFIX';
        /** Index number. The default value for this parameter is configured in the search service config file in the "abasconfig" directory.  */
        index?: string;
        /**
         * If this parameter is true, the full text search service response will be parsed for highlighting information and a list of matching keywords will be created and returned.
         * @default false
         */
        keywords?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseSearchResultErpDataObjectList, any>({
        path: `/r/${clientId}/search`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a list of all printable layouts and printers for a dataset. It shows more layouts than in the GUI screen.
     *
     * @tags Print
     * @name GetLayouts1
     * @summary Get a List of all printable layouts and printers for a database record.
     * @request GET:/r/{clientId}/print
     */
    getLayouts1: (
      clientId: string,
      query: {
        /** The ID of the database record. Search word, identity number, or queries can be used here, too, provided they identify a database record unambiguously. */
        id: string;
        /** Context row. */
        rowSpec?: string;
        /** Filter by layout. */
        layout?: string;
        /** Filter by printer. */
        printer?: string;
        /**
         * Filter by file type.
         * @default "pdf"
         */
        fileType?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpPrintLayoutList, any>({
        path: `/r/${clientId}/print`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Print a database record using default print settings. The specific print settings are controlled by the request body. The response includes a link to the generated file.
     *
     * @tags Print
     * @name PrintById
     * @summary Print a database record.
     * @request POST:/r/{clientId}/print
     */
    printById: (
      clientId: string,
      query: {
        /** The ID of the database record. Search word, identity number, or queries can be used here, too, provided they identify a database record unambiguously. */
        id: string;
        /** Context row. */
        rowSpec?: string;
      },
      data: ErpPrintParameters,
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/print`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Query a list of objects for a specified client and an abas ERP table. If the URL is too long, consider using the /query subresource.
     *
     * @tags Database Objects, Query
     * @name GetList
     * @summary Query database records of a corresponding table.
     * @request GET:/r/{clientId}/obj/data/{table}
     */
    getList: (
      clientId: string,
      table: string,
      query?: {
        /** When true, the records are loaded in memory instead of being streamed from the database */
        noStreaming?: boolean;
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Query string. You can find the syntax information <a href="https://extranet.abas.de/sub_de/help/he/html/2.6.18.9.html#00246_Selektionssyntax">here</a>
         * @default ""
         * @example "name=a!z"
         */
        criteria?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default ""
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "-"
         * @example "*"
         */
        tableFields?: string;
        /**
         * Result offset (for example, for paging). This is the number of items to skip in the result. If the total number of available items exceeds the limit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * Maximum number of items to retrieve. If limit is 0, all objects are returned.
         * @format int32
         * @default 20
         */
        limit?: number;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 1
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObjectList, any>({
        path: `/r/${clientId}/obj/data/${table}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create an empty object for a specified client in a table. Optionally, you can also provide values for the object. The smart editor is used automatically for this resource.
     *
     * @tags Database Objects
     * @name CreateNew
     * @summary Create a database record of a corresponding table.
     * @request POST:/r/{clientId}/obj/data/{table}
     */
    createNew: (
      clientId: string,
      table: string,
      data: ErpDataObjectInput,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * To create a new object from a copy of another object, specify the ID of the source object here.
         * @example "(1,2,3)"
         */
        copyFrom?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/r/${clientId}/obj/data/${table}`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Read a database record by ID in a specified client and abas ERP table.
     *
     * @tags Database Objects
     * @name GetRecord
     * @summary Read a database record.
     * @request GET:/r/{clientId}/obj/data/{table}/{id}
     */
    getRecord: (
      clientId: string,
      table: string,
      id: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG"EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         * @example "*"
         */
        tableFields?: string;
        /**
         * Configures how data are obtained.
         * @example "QUERY"
         */
        dataSource?: 'QUERY' | 'EDITOR' | 'AUTO_FAV_QUERY' | 'AUTO_FAV_EDITOR';
        /**
         * Deprecated, use dataSource=EDITOR or dataSource=QUERY
         * @deprecated
         */
        byQuery?: boolean;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If the limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObject, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update a database record by ID in a specified client and abas ERP table. The smart editor is automatically used for this resource.
     *
     * @tags Database Objects
     * @name UpdateRecord
     * @summary Update a database record.
     * @request POST:/r/{clientId}/obj/data/{table}/{id}
     */
    updateRecord: (
      clientId: string,
      table: string,
      id: string,
      data: ErpDataObjectInput,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Delete a database record by ID in a specified client and abas ERP table.
     *
     * @tags Database Objects
     * @name DeleteRecord
     * @summary Delete a database record.
     * @request DELETE:/r/{clientId}/obj/data/{table}/{id}
     */
    deleteRecord: (
      clientId: string,
      table: string,
      id: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObject, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * @description List of print layouts configured for a corresponding database record. The list includes detailed information about ID, name, and output print formats. The user must have the following ERP permissions to access this resource: * Permission for type command number "43".
     *
     * @tags Database Objects
     * @name GetLayouts2
     * @summary List of print layouts for a corresponding database record.
     * @request GET:/r/{clientId}/obj/data/{table}/{id}/print
     */
    getLayouts2: (
      clientId: string,
      table: string,
      id: string,
      query?: {
        /** Context row. */
        rowSpec?: string;
        /** Filter by layout. */
        layout?: string;
        /** Filter by printer. */
        printer?: string;
        /**
         * Filter by file type.
         * @default "pdf"
         */
        fileType?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpPrintLayoutList, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}/print`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Print a corresponding database record using default print settings. The response includes a link to the generated file. The user must have the following ERP permissions to access this resource: * Permission for type command number "43".
     *
     * @tags Database Objects, Print
     * @name Print1
     * @summary Print a corresponding database record.
     * @request POST:/r/{clientId}/obj/data/{table}/{id}/print
     */
    print1: (
      clientId: string,
      table: string,
      id: string,
      data: ErpPrintParameters,
      query?: {
        /** Context row. */
        rowSpec?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}/print`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get information about the defined command for a corresponding database record according the defined client, abas ERP group, and a database record ID.
     *
     * @tags Database Objects
     * @name GetCommand
     * @summary Get information about the defined command for a corresponding database record.
     * @request GET:/r/{clientId}/obj/data/{table}/{id}/commands/{command}
     */
    getCommand: (
      clientId: string,
      table: string,
      id: string,
      command: string,
      query?: {
        /**
         * Set to "false" to see commands the current user is not permitted to use.
         * @default true
         */
        permittedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseOpenEditor, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}/commands/${command}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new editor to execute the defined command on a corresponding database record according the defined client, abas ERP group, and a database record ID.
     *
     * @tags Database Objects
     * @name PostCommand1
     * @summary Execute the defined command on a corresponding database record.
     * @request POST:/r/{clientId}/obj/data/{table}/{id}/commands/{command}
     */
    postCommand1: (
      clientId: string,
      table: string,
      id: string,
      command: string,
      data: EditorInitCommandExtension,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /** Use an existing working set for this operation. If no working set with that name can be found, a new one will be created. */
        workingSetId?: string;
        /** Use an existing editor for this operation. If no editor with that name can be found, a new one will be created. */
        editorId?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterTableFields?: string;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Sets whether the editor should report all field changes. This includes fields changed by the user as well as fields changed by the server as a result.
         * @default true
         */
        cn?: boolean;
        /**
         * Set this to "false" if you don't want the editor started immediately with the request because you need do something with the editor before that. For example, if you want to start listening to SSE events first.
         * @default true
         */
        start?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}/commands/${command}`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Search database records for the specified full text search query according the defined client and abas ERP group.
     *
     * @tags Database Objects, Search
     * @name GetList1
     * @summary Search database records using the full text search engine.
     * @request GET:/r/{clientId}/obj/data/{table}/search
     */
    getList1: (
      clientId: string,
      table: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Response format. "SE" for the native search engine response or "ERP" for the normal response format of this Rest API.
         * @default "ERP"
         */
        format?: 'ERP' | 'SE';
        /**
         * Search engine query mode.
         * @default "DEFAULT"
         */
        mode?: 'DEFAULT' | 'PREFIX';
        /** Index number. The default value for this parameter is configured in the search service config file in the "abasconfig" directory.  */
        index?: string;
        /**
         * If this parameter is true, the full text search service response will be parsed for highlighting information and a list of matching keywords will be created and returned.
         * @default false
         */
        keywords?: boolean;
        /** Query expression */
        query?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "-"
         * @example "*"
         */
        tableFields?: string;
        /**
         * Maximum number of items to retrieve. If limit is 0, all objects are returned.
         * @format int32
         * @default 20
         */
        limit?: number;
        /**
         * Result offset (for example, for paging). This is the number of items to skip in the result. If the total number of available items exceeds the limit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 0
         */
        offset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 1
         */
        tableOffset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseSearchResultErpDataObjectList, any>({
        path: `/r/${clientId}/obj/data/${table}/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Search database records for the specified full text search query according the defined client and abas ERP group. The full text search query is defined in the POST request body.
     *
     * @tags Database Objects, Search
     * @name PostList
     * @summary Search database records using the full text search engine.
     * @request POST:/r/{clientId}/obj/data/{table}/search
     */
    postList: (
      clientId: string,
      table: string,
      data: SearchEngineQuery,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Response format. "SE" for the native search engine response or "ERP" for the normal response format of this Rest API.
         * @default "ERP"
         */
        format?: 'ERP' | 'SE';
        /**
         * Search engine query mode.
         * @default "DEFAULT"
         */
        mode?: 'DEFAULT' | 'PREFIX';
        /** Index number. The default value for this parameter is configured in the search service config file in the "abasconfig" directory.  */
        index?: string;
        /**
         * If this parameter is true, the full text search service response will be parsed for highlighting information and a list of matching keywords will be created and delivered.
         * @default false
         */
        keywords?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseSearchResultErpDataObjectList, any>({
        path: `/r/${clientId}/obj/data/${table}/search`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description List records for the specified query according the defined client and abas ERP group. If the URL is too long, consider using the POST variant.
     *
     * @tags Database Objects, Query
     * @name GetList2
     * @summary Query database records of a corresponding table.
     * @request GET:/r/{clientId}/obj/data/{table}/query
     */
    getList2: (
      clientId: string,
      table: string,
      query?: {
        /** When true, the records are loaded in memory instead of being streamed from the database */
        noStreaming?: boolean;
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Query string. You can find the syntax information <a href="https://extranet.abas.de/sub_de/help/he/html/2.6.18.9.html#00246_Selektionssyntax">here</a>
         * @default ""
         * @example "name=a!z"
         */
        criteria?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default ""
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "-"
         * @example "*"
         */
        tableFields?: string;
        /**
         * Result offset (for example, for paging). This is the number of items to skip in the result. If the total number of available items exceeds the limit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * Maximum number of items to retrieve. If limit is 0, all objects are returned.
         * @format int32
         * @default 20
         */
        limit?: number;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 1
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObjectList, any>({
        path: `/r/${clientId}/obj/data/${table}/query`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List database records for the specified query according the defined client and abas ERP group. The query is defined in the POST request body.
     *
     * @tags Database Objects, Query
     * @name Query
     * @summary Query database records of a corresponding table.
     * @request POST:/r/{clientId}/obj/data/{table}/query
     */
    query: (
      clientId: string,
      table: string,
      data: DatabaseQuery,
      query?: {
        /** When true, the records are loaded in memory instead of being streamed from the database */
        noStreaming?: boolean;
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObjectList, any>({
        path: `/r/${clientId}/obj/data/${table}/query`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get information about the defined command for a corresponding database group according the defined client and abas ERP group.
     *
     * @tags Database Objects
     * @name GetCommand1
     * @summary Get information about the defined command for a corresponding database group.
     * @request GET:/r/{clientId}/obj/data/{table}/commands/{command}
     */
    getCommand1: (
      clientId: string,
      table: string,
      command: string,
      query?: {
        /**
         * Set to "false" to see commands the current user is not permitted to use.
         * @default true
         */
        permittedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseOpenEditor, any>({
        path: `/r/${clientId}/obj/data/${table}/commands/${command}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new editor to execute the defined command on a corresponding database group according the defined client and abas ERP group.
     *
     * @tags Database Objects
     * @name PostCommand2
     * @summary Execute the defined command on a corresponding database group.
     * @request POST:/r/{clientId}/obj/data/{table}/commands/{command}
     */
    postCommand2: (
      clientId: string,
      table: string,
      command:
        | 'DONE'
        | 'GET'
        | 'RELEASE'
        | 'DELIVERY'
        | 'INVOICE'
        | 'PAYMENT'
        | 'REVERSAL'
        | 'CALCULATE'
        | 'TRANSFER'
        | 'DELETE'
        | 'VIEW'
        | 'UPDATE'
        | 'NEW'
        | 'COPY'
        | 'MODIFY'
        | 'STORE'
        | 'REMOVE'
        | 'DO'
        | 'RETURN',
      data: EditorInitCommandExtension,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /** Use an existing working set for this operation. If no working set with that name can be found, a new one will be created. */
        workingSetId?: string;
        /** Use an existing editor for this operation. If no editor with that name can be found, a new one will be created. */
        editorId?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         */
        filterTableFields?: string;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Sets whether the editor should report all field changes. This includes fields changed by the user as well as fields changed by the server as a result.
         * @default true
         */
        cn?: boolean;
        /**
         * Set this to "false" if you don't want the editor started immediately with the request because you need do something with the editor before that. For example, if you want to start listening to SSE events first.
         * @default true
         */
        start?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeAbstractEditResponse, any>({
        path: `/r/${clientId}/obj/data/${table}/commands/${command}`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Batch look up database records by ID in a specified client. Only header fields can be read and the field list has to be the same for all records.
     *
     * @tags Database Objects
     * @name Get9
     * @summary Batch look up database records by ID.
     * @request GET:/r/{clientId}/obj/data/byIds
     */
    get9: (
      clientId: string,
      query: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * An ID of a database record. To read multiple records, add this parameter to the request multiple times.
         * @example "(1,2,3)"
         */
        id: string[];
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObjectList, any>({
        path: `/r/${clientId}/obj/data/byIds`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Look up database records by ID in a specified client.
     *
     * @tags Database Objects
     * @name Post1
     * @summary Batch look up database records by ID.
     * @request POST:/r/{clientId}/obj/data/byIds
     */
    post1: (
      clientId: string,
      data: MultipleIds,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         * @default "ENABLED"
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObjectList, any>({
        path: `/r/${clientId}/obj/data/byIds`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description View basic information about the infosystem. The user must have the following ERP permissions to access this resource: * Query permission for database "65:1".
     *
     * @tags Infosystem
     * @name GetInfosystemInformation
     * @summary View basic information about infosystem.
     * @request GET:/r/{clientId}/infosys/data/{workspace}/{searchWord}
     */
    getInfosystemInformation: (clientId: string, workspace: string, searchWord: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/infosys/data/${workspace}/${searchWord}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Execute an infosystem and get the result in a single request The user must have the following ERP permissions to access this resource: * Permission for action "GET" on database "65:1".
     *
     * @tags Infosystem
     * @name ExecuteInfosystem
     * @summary Execute an infosystem.
     * @request POST:/r/{clientId}/infosys/data/{workspace}/{searchWord}
     */
    executeInfosystem: (
      clientId: string,
      workspace: string,
      searchWord: string,
      data: InfosystemCommands,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         * @default "ENABLED"
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObject, any>({
        path: `/r/${clientId}/infosys/data/${workspace}/${searchWord}`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Open an EDP editor in a specified client, apply multiple commands, and optionally save the result. <br/>This can be used to create/update/delete database records, execute infosystems, run type commands, etc. You can find a complete list of the EDP editing actions <a href="https://extranet.abas.de/sub_de/help/he/html/300.17.2.3.5.html#300.17.2.3.5.6">here</a> . <br/><br/>The editor is opened via the "initAction" property of the post body. <br/>Then all "actions" are applied in order. <br/> If no "closingAction" is defined the editor is canceled.
     *
     * @tags Exec, Database Objects, Type Command, Infosystem
     * @name Execute
     * @summary Use an EDP editor to change a database record.
     * @request POST:/r/{clientId}/exec
     */
    execute: (
      clientId: string,
      data: CommonEditorCommands,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         * @default "ENABLED"
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObject, any>({
        path: `/r/${clientId}/exec`,
        method: 'POST',
        query: query,
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get the list of clients configured for the abas ERP Rest API.
     *
     * @tags Miscellaneous
     * @name Get
     * @summary List of abas ERP clients.
     * @request GET:/r
     */
    get: (params: RequestParams = {}) =>
      this.request<EnvelopeRootDirectory, any>({
        path: `/r`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Context of one abas ERP client. All subresources belong to the client specified by clientId. Returns a list of links to subresources.
     *
     * @tags Miscellaneous
     * @name GetRoot
     * @summary Get an overview of resources for a specified client.
     * @request GET:/r/{clientId}
     */
    getRoot: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workspace
     * @name Get3
     * @summary List working sets in this working set.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip
     */
    get3: (clientId: string, workingSet: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseWorkingSetEditorList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description List infosystems that can be called for the database record in the working set editor. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * The infosystem "st/AUFRUFPARAMETER" should be runnable by user.
     *
     * @tags Workspace
     * @name GetInfosystems
     * @summary List infosystems of the database record in the working set editor.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/infosystems
     */
    getInfosystems: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      query?: {
        /**
         * Context row. Use "0" for head.
         * @default "0"
         */
        rowSpec?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpActionListItem, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/infosystems`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fields that are supported by this resource have a link with rel "urn:abas:rel:fieldValues" that links to here.
     *
     * @tags Workspace
     * @name GetValues
     * @summary List possible values for an enumeration table field.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/values
     */
    getValues: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      rowSpec: string,
      fieldName: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseFieldValues, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/table/${rowSpec}/${fieldName}/values`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reference fields have a link with rel "urn:abas:rel:selection" that links to here.
     *
     * @tags Workspace, Query
     * @name GetFieldSelectionList
     * @summary List database tables for possible table field values.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/select
     */
    getFieldSelectionList: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      rowSpec: string,
      fieldName: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/table/${rowSpec}/${fieldName}/select`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Query the a database table for possible field values. Results are restricted to possible values for this field. See parent resource for possible values for "table".
     *
     * @tags Workspace, Query
     * @name GetSelectionResult
     * @summary Query for possible values for a reference table field.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/table/{rowSpec}/{fieldName}/select/{table}
     */
    getSelectionResult: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      rowSpec: string,
      fieldName: string,
      table: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Query string. You can find the syntax information <a href="https://extranet.abas.de/sub_de/help/he/html/2.6.18.9.html#00246_Selektionssyntax">here</a>
         * @default ""
         * @example "name=a!z"
         */
        criteria?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default ""
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "-"
         * @example "*"
         */
        tableFields?: string;
        /**
         * Result offset (for example, for paging). This is the number of items to skip in the result. If the total number of available items exceeds the limit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * Maximum number of items to retrieve. If limit is 0, all objects are returned.
         * @format int32
         * @default 20
         */
        limit?: number;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 1
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObjectList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/table/${rowSpec}/${fieldName}/select/${table}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fields that are supported by this resource have a link with rel "urn:abas:rel:fieldValues" that links to here.
     *
     * @tags Workspace
     * @name GetValues1
     * @summary List possible values for an enumeration header field.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/values
     */
    getValues1: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      fieldName: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseFieldValues, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/head/${fieldName}/values`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reference fields have a link with rel "urn:abas:rel:selection" that links to here.
     *
     * @tags Workspace, Query
     * @name GetFieldSelectionList1
     * @summary List database tables for possible header field values.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/select
     */
    getFieldSelectionList1: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      fieldName: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/head/${fieldName}/select`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Query a database table for possible field values. Results are restricted to possible values for this field. See parent resource for possible values for "table".
     *
     * @tags Workspace, Query
     * @name GetSelectionResult1
     * @summary Query for possible values for a reference header field.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/fields/head/{fieldName}/select/{table}
     */
    getSelectionResult1: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      fieldName: string,
      table: string,
      query?: {
        /**
         * Sets the "TRIMVALUES" EDP option. Determines the setting for whether output field contents should be trimmed, i.e leading and following spaces are removed.
         * @default true
         */
        trimValues?: boolean;
        /** Sets the "FOPMODE" EDP option. Enables/Disables the execution of (E)FOPs (corresponds with FOP +/- in abas). For this to work, the user must have the corresponding ERP permissions. */
        disableFOP?: boolean;
        /** Sets abas ERP server flags (EDP options TESTFLAGxxx). <b>Note:</b> Don't use this flag without authorization from abas support. <br/> The syntax is a comma-separated list of flag numbers, each prefixed with + or - to enable or disable the flag. For example, "+298,+301,-46" */
        erpFlags?: string;
        /**
         * Sets the "FTMODE" EDP option to "TEXT:<length>". Free texts will be output as texts with the specified maximum length. The value must not exceed the hard limit configured in the abas REST API ERP connection config file.
         * @format int32
         * @example 16384
         */
        maxFTextSize?: number;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Sets the timeout to wait for a lock on an abas ERP record in seconds. A value less than 0 means: wait infinitely.
         * @format int32
         */
        maxWaitOnLock?: number;
        /** Sets the "STOREROWMODE" EDP option for the "STORE" (create or update) edit action. This controls the behavior of the editor regarding the deletion of unchanged rows. */
        storeRowMode?: 'DELTAIL' | 'DELTAILMOD' | 'DELNONE';
        /**
         * Sets the "DIALOGMODE" EDP option. The following values are supported:
         * * ENABLED: Enable the ERP dialog mode (EDP: DIALOGMODE=1)
         * * DISABLED: Disable the ERP dialog mode (EDP: DIALOGMODE=0)
         * * BLOCKING: Enable the blocking dialog mode (EDP: DIALOGMODE=2).
         */
        dialogMode?: 'DISABLED' | 'ENABLED' | 'BLOCKING';
        /**
         * The timeout (in seconds) of blocking actions. This is only relevant for interactive editing in a working set editor.
         * @format int32
         */
        blockingActionTimeout?: number;
        /** Enable blocking actions. This is only relevant for interactive editing in a working set editor. For working set editors, it is true. If the underlying ERP version does not support blocking dialogs, it is set to false. For all other resources, it is disabled */
        enableBlockingActions?: boolean;
        /**
         * Query string. You can find the syntax information <a href="https://extranet.abas.de/sub_de/help/he/html/2.6.18.9.html#00246_Selektionssyntax">here</a>
         * @default ""
         * @example "name=a!z"
         */
        criteria?: string;
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default ""
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "-"
         * @example "*"
         */
        tableFields?: string;
        /**
         * Result offset (for example, for paging). This is the number of items to skip in the result. If the total number of available items exceeds the limit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * Maximum number of items to retrieve. If limit is 0, all objects are returned.
         * @format int32
         * @default 20
         */
        limit?: number;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         * @default 1
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDataObjectList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/fields/head/${fieldName}/select/${table}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Listen to events of this editor. This includes open/close and message events.
     *
     * @tags Workspace
     * @name Listen
     * @summary Listen to events of this editor via SSE.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/events
     */
    listen: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      query?: {
        /**
         * Media type of the editor events. Note that you will also receive ping events, which are plain text.
         * @default "application/json"
         */
        mediaType?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/events`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description List metadata of the specified call parameter(s) to the database record in the working set editor. The listed information provides links for a call parameter executed directly from the database record context. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * The infosystem "st/AUFRUFPARAMETER" should be runnable by user.
     *
     * @tags Workspace
     * @name EvalCallParameters
     * @summary List metadata of the specified call parameter(s) to the database record in the working set editor.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/evalCallParameters
     */
    evalCallParameters: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      query?: {
        /** Context row. */
        rowSpec?: string;
        /** A call parameter to evaluate. This parameter can be specified multiple times in a single request. */
        cp?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpCommands, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/evalCallParameters`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Result depends on the editor state. It only contains links to commands that are currently available for the editor.
     *
     * @tags Workspace
     * @name GetCommandsList
     * @summary List of links to commands.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/commands
     */
    getCommandsList: (clientId: string, workingSet: string, workingSetEditor: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/commands`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description List actions that can be executed on the database record in the working set editor. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * The infosystem "st/AUFRUFPARAMETER" should be runnable by user.
     *
     * @tags Workspace
     * @name GetActions
     * @summary List actions of the database record in the working set editor.
     * @request GET:/r/{clientId}/workspace/{workingSet}/wip/{workingSetEditor}/actions
     */
    getActions: (
      clientId: string,
      workingSet: string,
      workingSetEditor: string,
      query?: {
        /**
         * Context row. Use "0" for header.
         * @default "0"
         */
        rowSpec?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpActionListItem, any>({
        path: `/r/${clientId}/workspace/${workingSet}/wip/${workingSetEditor}/actions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns a list of links to all available commands.
     *
     * @tags Workspace
     * @name Get4
     * @summary List of links to commands.
     * @request GET:/r/{clientId}/workspace/{workingSet}/commands
     */
    get4: (clientId: string, workingSet: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/workspace/${workingSet}/commands`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workspace
     * @name Get5
     * @summary List all editors in this workspace.
     * @request GET:/r/{clientId}/workspace/wip
     */
    get5: (
      clientId: string,
      query?: {
        /** Only return working sets with this label. */
        workingSetLabel?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseWorkingSetEditorList, any>({
        path: `/r/${clientId}/workspace/wip`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Working sets that are not used for a certain amount of time are canceled. Use this resource to reset the timer for multiple working sets.The global timeout is documented here: /mw/apidoc/html5/admin-guide.html#ErpConnectionConfiguration
     *
     * @tags Workspace
     * @name Get6
     * @summary Keep working set with label alive.
     * @request GET:/r/{clientId}/workspace/keepalive
     */
    get6: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeString, any>({
        path: `/r/${clientId}/workspace/keepalive`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Listen to events of all editors of the current user. This includes open/close and message events.
     *
     * @tags Workspace
     * @name Listen1
     * @summary Listen to all editor events via SSE.
     * @request GET:/r/{clientId}/workspace/events
     */
    listen1: (
      clientId: string,
      query?: {
        /**
         * Media type of the editor events. Note that you will also receive ping events, which are plain text.
         * @default "application/json"
         */
        mediaType?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/workspace/events`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description List of links to all document contexts.
     *
     * @tags Workspace
     * @name GetContexts
     * @summary List of document contexts
     * @request GET:/r/{clientId}/workspace/docs
     */
    getContexts: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeLinkList, any>({
        path: `/r/${clientId}/workspace/docs`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Workspace
     * @name Delete
     * @summary Delete all documents in all contexts.
     * @request DELETE:/r/{clientId}/workspace/docs
     */
    delete: (clientId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/r/${clientId}/workspace/docs`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * @description Download the document.
     *
     * @tags Workspace
     * @name GetDocument
     * @summary Download document.
     * @request GET:/r/{clientId}/workspace/docs/{context}/{id}
     */
    getDocument: (
      clientId: string,
      context: string,
      id: string,
      query?: {
        /**
         * If "true" the response will have a "Content-Disposition" header.
         * @default false
         */
        download?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<StreamingResponseBody, any>({
        path: `/r/${clientId}/workspace/docs/${context}/${id}`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Delete a single document.
     *
     * @tags Workspace
     * @name DeleteDocument
     * @summary Delete document.
     * @request DELETE:/r/{clientId}/workspace/docs/{context}/{id}
     */
    deleteDocument: (clientId: string, context: string, id: string, params: RequestParams = {}) =>
      this.request<HtmlPage, any>({
        path: `/r/${clientId}/workspace/docs/${context}/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * @description Information about the user whose credentials are used for the current request.
     *
     * @tags Miscellaneous
     * @name GetUserInfo
     * @summary Get information about the current user.
     * @request GET:/r/{clientId}/userInfo
     */
    getUserInfo: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseErpUserInfo, any>({
        path: `/r/${clientId}/userInfo`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a link list for type commands. The link list contain a list of type commands, the metadata, and a resource to execute a type command.
     *
     * @tags System Objects
     * @name Get7
     * @summary Get a link list for type commands.
     * @request GET:/r/{clientId}/sys
     */
    get7: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/sys`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Get information about abas field type.
     *
     * @tags System Objects
     * @name GetType
     * @summary Get information about abas field type.
     * @request GET:/r/{clientId}/sys/types/{type}
     */
    getType: (clientId: string, type: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseErpTypeInfo, any>({
        path: `/r/${clientId}/sys/types/${type}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Get all common selected fields in the database that represent the reference field.
     *
     * @tags System Objects
     * @name GetReferenceTypeCommonFields
     * @summary Get all common selected fields in the database that represent the reference field.
     * @request GET:/r/{clientId}/sys/types/{type}/fields
     */
    getReferenceTypeCommonFields: (
      clientId: string,
      type: string,
      query?: {
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        selHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        selTableFields?: string;
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseReferenceTypeFieldList, any>({
        path: `/r/${clientId}/sys/types/${type}/fields`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all available type commands with a link to execute the type command.
     *
     * @tags System Objects, Type Command
     * @name GetListOfTypeCommands
     * @summary List all available type commands
     * @request GET:/r/{clientId}/sys/typeCmd
     */
    getListOfTypeCommands: (
      clientId: string,
      query?: {
        /**
         * Set to "false" to see commands the current user is not permitted to use.
         * @default true
         */
        permittedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/sys/typeCmd`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List metadata of all available type commands with the description in the selected language and the number of the type command.
     *
     * @tags System Objects, Type Command, Metadata
     * @name GetListOfTypeCommandsMetadata
     * @summary Get metadata of all available type commands
     * @request GET:/r/{clientId}/sys/typeCmd/meta
     */
    getListOfTypeCommandsMetadata: (
      clientId: string,
      query?: {
        /**
         * Set to "false" to see commands the current user is not permitted to use.
         * @default false
         */
        permittedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpTypeCommandsList, any>({
        path: `/r/${clientId}/sys/typeCmd/meta`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get the actual configuration setting for the full text search.
     *
     * @tags Search
     * @name GetConfig
     * @summary Get the actual configuration setting for the full text search.
     * @request GET:/r/{clientId}/search/config
     */
    getConfig: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeSearchEngineConfiguration, any>({
        path: `/r/${clientId}/search/config`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description You can get the links for data and metadata end points, for any specified client, using this resource.
     *
     * @tags Database Objects, Metadata
     * @name GetObjRoot
     * @summary List links for ERP database group and metadata.
     * @request GET:/r/{clientId}/obj
     */
    getObjRoot: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/obj`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns a list with metadata for all database groups. If you need more metadata for a group, visit the metadata resource for that group.
     *
     * @tags Database Objects, Metadata
     * @name GetTableList
     * @summary Metadata for all database groups.
     * @request GET:/r/{clientId}/obj/meta
     */
    getTableList: (
      clientId: string,
      query?: {
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /** Filter by selectable property. Set to "true" to only receive selectable results. Set to "false" for not selectable. */
        selectable?: boolean;
        /** Filter by editable property. Set to "true" to only receive editable results. Set to "false" for not editable. */
        editable?: boolean;
        /** Filter by header persistent property. Set to "true" to only receive results where the header is persistent. Set to "false" for not persistent. */
        headPersistent?: boolean;
        /** Filter by table persistent property. Set to "true" to only receive results where the table is persistent. Set to "false" for not persistent. */
        tablePersistent?: boolean;
        /** Filter by table table property. Set to "true" to only receive results with a table. Set to "false" for no table. */
        hasTable?: boolean;
        /** Filter by header quoted property. Set to "true" to only receive results where the header is quoted. Set to "false" for not quoted. */
        headQuoted?: boolean;
        /** Filter by table quoted property. Set to "true" to only receive results where the table is quoted. Set to "false" for not quoted. */
        tableQuoted?: boolean;
        /** Filter by identifiable property. Set to "true" to only receive identifiable results. Set to "false" for not identifiable. */
        identifiable?: boolean;
        /** Filter by masterdata property. Set to "true" to only receive masterdata results. Set to "false" for not transactional data. */
        masterdata?: boolean;
        /** Filter by configured property. Set to "true" to only receive results that are configured. Set to "false" for not configured. */
        configured?: boolean;
        /** Filter by single object property. Set to "true" to only receive results that contain a single object (e.g. CompanyData). Set to "false" for multiple objects. */
        singleObject?: boolean;
        /** Filter by single additional property. Set to "true" to only receive results from additional tables. Set to "false" for standard tables. */
        additional?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDbGroupDescriptorList, any>({
        path: `/r/${clientId}/obj/meta`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Metadata for a database group and its fields.
     *
     * @tags Database Objects, Metadata
     * @name GetSingleTable
     * @summary Get metadata for the specified database group.
     * @request GET:/r/{clientId}/obj/meta/{table}
     */
    getSingleTable: (
      clientId: string,
      table: string,
      query?: {
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        selHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        selTableFields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDbTableMeta, any>({
        path: `/r/${clientId}/obj/meta/${table}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List metadata of call parameters that can be used from the database group. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * Query permission for database "12:26". * Query permission for database "65:1".
     *
     * @tags Database Objects, Metadata
     * @name GetDestinations
     * @summary Metadata of call parameters for a database group.
     * @request GET:/r/{clientId}/obj/meta/{table}/destinations
     */
    getDestinations: (
      clientId: string,
      table: string,
      query?: {
        /** Filter by custom property. Set to "true" to only receive custom call parameters. Set to "false" for standard call parameters. */
        custom?: boolean;
        /** Filter by common property. Set to "true" to only receive common call parameters. Set to "false" for call parameters this table only. */
        common?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpCallParameters, any>({
        path: `/r/${clientId}/obj/meta/${table}/destinations`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List metadata of commands that can be executed on a corresponding database group (for example, create, copy, view, edit, etc. ).
     *
     * @tags Database Objects, Metadata
     * @name GetCommands
     * @summary Metadata of commands of a database group.
     * @request GET:/r/{clientId}/obj/meta/{table}/commands
     */
    getCommands: (
      clientId: string,
      table: string,
      query?: {
        /**
         * Set to "false" to see commands the current user is not permitted to use.
         * @default false
         */
        permittedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpDbCommandsList, any>({
        path: `/r/${clientId}/obj/meta/${table}/commands`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List links for abas ERP data according to the specified abas ERP client.
     *
     * @tags Database Objects
     * @name Get8
     * @summary List links for ERP database group.
     * @request GET:/r/{clientId}/obj/data
     */
    get8: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/obj/data`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description List infosystems that can be called for a corresponding database record in the defined client, abas ERP group, and a database record ID. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * The infosystem "st/AUFRUFPARAMETER" should be runnable by user.
     *
     * @tags Database Objects
     * @name GetInfosystems1
     * @summary List infosystems of a corresponding database record.
     * @request GET:/r/{clientId}/obj/data/{table}/{id}/infosystems
     */
    getInfosystems1: (
      clientId: string,
      table: string,
      id: string,
      query?: {
        /**
         * Context row. Use "0" for header.
         * @default "0"
         */
        rowSpec?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpActionListItem, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}/infosystems`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get the complete contents of a freetext table field.
     *
     * @tags Database Objects
     * @name GetTableValue1
     * @summary Get value of a freetext table field.
     * @request GET:/r/{clientId}/obj/data/{table}/{id}/fields/table/{rowSpec}/{fieldName}/value
     */
    getTableValue1: (
      clientId: string,
      table: string,
      rowSpec: string,
      id: string,
      fieldName: string,
      query?: {
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/obj/data/${table}/${id}/fields/table/${rowSpec}/${fieldName}/value`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the complete contents of a freetext header field.
     *
     * @tags Database Objects
     * @name GetHeadValue1
     * @summary Get value of a freetext header field.
     * @request GET:/r/{clientId}/obj/data/{table}/{id}/fields/head/{fieldName}/value
     */
    getHeadValue1: (
      clientId: string,
      table: string,
      id: string,
      fieldName: string,
      query?: {
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/obj/data/${table}/${id}/fields/head/${fieldName}/value`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description List metadata of the specified call parameter(s) for a corresponding database record. The listed information provides links for a call parameter execution directly from the database record context. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * The infosystem "st/AUFRUFPARAMETER" should be runnable by user.
     *
     * @tags Database Objects
     * @name EvalCallParameters1
     * @summary List metadata of the specified call parameter(s) for a corresponding database record.
     * @request GET:/r/{clientId}/obj/data/{table}/{id}/evalCallParameters
     */
    evalCallParameters1: (
      clientId: string,
      table: string,
      id: string,
      query: {
        /** A call parameter to evaluate. This parameter can be specified multiple times in a single request. */
        cp: string[];
        /** Context row. */
        rowSpec?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpCommands, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}/evalCallParameters`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List commands which can be executed on a corresponding database record (for example create, copy, view, edit, etc. ) for the defined client, abas ERP group, and a database record ID.
     *
     * @tags Database Objects
     * @name GetCommands1
     * @summary List commands that can be executed with the specified object as the reference.
     * @request GET:/r/{clientId}/obj/data/{table}/{id}/commands
     */
    getCommands1: (
      clientId: string,
      table: string,
      id: string,
      query?: {
        /**
         * Set to "false" to see commands the current user is not permitted to use.
         * @default true
         */
        permittedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}/commands`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List actions that can be performed on a database record for the defined client, abas ERP group, and a database record ID. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * The infosystem "st/AUFRUFPARAMETER" should be runnable by user.
     *
     * @tags Database Objects
     * @name GetActions1
     * @summary List actions of a corresponding database record.
     * @request GET:/r/{clientId}/obj/data/{table}/{id}/actions
     */
    getActions1: (
      clientId: string,
      table: string,
      id: string,
      query?: {
        /**
         * Context row. Use "0" for head.
         * @default "0"
         */
        rowSpec?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpActionListItem, any>({
        path: `/r/${clientId}/obj/data/${table}/${id}/actions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List commands that can be executed on a corresponding database group for the defined client and abas ERP group.
     *
     * @tags Database Objects
     * @name GetCommands2
     * @summary List commands that can be executed without an object reference.
     * @request GET:/r/{clientId}/obj/data/{table}/commands
     */
    getCommands2: (
      clientId: string,
      table: string,
      query?: {
        /**
         * Set to "false" to see commands the current user is not permitted to use.
         * @default true
         */
        permittedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/obj/data/${table}/commands`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Look up a database record by ID in a specified client. If successful, a redirect (303 see other) to the correct resource will be returned.
     *
     * @tags Database Objects
     * @name FindById
     * @summary Look up a database record by ID
     * @request GET:/r/{clientId}/obj/data/byId/{id}
     */
    findById: (
      clientId: string,
      id: string,
      query?: {
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         * @example "id,nummer,such,sucherw"
         */
        headFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @default "*"
         * @example "*"
         */
        tableFields?: string;
        /**
         * Configures how data are obtained.
         * @example "QUERY"
         */
        dataSource?: 'QUERY' | 'EDITOR' | 'AUTO_FAV_QUERY' | 'AUTO_FAV_EDITOR';
        /**
         * Deprecated, use dataSource=EDITOR or dataSource=QUERY
         * @deprecated
         */
        byQuery?: boolean;
        /**
         * Table result offset (for example, for paging). This is the number of items to skip in the table result window. If the total number of available items exceeds the tableLimit, an offset greater than 0 must be used to iterate over all items.
         * @format int32
         * @min 0
         */
        tableOffset?: number;
        /**
         * Maximum number of items to retrieve from a table result window. If limit is 0, all items are returned.
         * @format int32
         */
        tableLimit?: number;
        /**
         * Configures how the table is determined. Use "true" for object group, "false" for persistent group.
         * @default true
         */
        objectGroup?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<StreamingResponseBody, any>({
        path: `/r/${clientId}/obj/data/byId/${id}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List of action commands for the specified reference field type of the defined abas ERP client.
     *
     * @tags Database Objects
     * @name Get10
     * @summary List of commands for the specified reference field type.
     * @request GET:/r/{clientId}/obj/commands/{type}
     */
    get10: (clientId: string, type: string, params: RequestParams = {}) =>
      this.request<EnvelopeLinkList, any>({
        path: `/r/${clientId}/obj/commands/${type}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the formatted string for value on the basis of the specified erpType.
     *
     * @tags Format
     * @name FormatValue
     * @summary Formats a value according to the specified ERP field type.
     * @request GET:/r/{clientId}/methods/formatValue
     */
    formatValue: (
      clientId: string,
      query: {
        /**
         * The ERP field type. See more information here: https://extranet.abas.de/sub_de/help/he/html/2.6.35.html
         * @example "R7.2"
         */
        erpType: string;
        /**
         * The value to be formatted.
         * @example 45000
         */
        value: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpSingleValue, any>({
        path: `/r/${clientId}/methods/formatValue`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Field formatter for infosystem objects. The formatted string for a <i>value</i> according to the specified infosystem definitions: workspace, searchWord, fieldName and tableField will be returned.
     *
     * @tags Format
     * @name FormatInfosysFieldValue
     * @summary Formats a value according to the specified infosystem field.
     * @request GET:/r/{clientId}/methods/formatInfosysFieldValue
     */
    formatInfosysFieldValue: (
      clientId: string,
      query: {
        /**
         * The infosystem workspace
         * @example "vk"
         */
        workspace: string;
        /**
         * The infosystem search word.
         * @example "VKZENTRALE"
         */
        searchWord: string;
        /**
         * The field name.
         * @example "datef"
         */
        fieldName: string;
        /** Is the field a table field? Example = "false" */
        tableField: boolean;
        /**
         * The value to be formatted.
         * @example 45000
         */
        value: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpSingleValue, any>({
        path: `/r/${clientId}/methods/formatInfosysFieldValue`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Field formatter for database objects. The formatted string for a <i>value</i> according to the specified tableName, fieldName and tableField will be returned.
     *
     * @tags Format
     * @name FormatDbFieldValue
     * @summary Formats a value according to the specified ERP database field.
     * @request GET:/r/{clientId}/methods/formatDbFieldValue
     */
    formatDbFieldValue: (
      clientId: string,
      query: {
        /**
         * The abas ERP table (database:group)", example = "2:1"
         * @example "2:1"
         */
        tableName: string;
        /**
         * The field name.
         * @example "mpr"
         */
        fieldName: string;
        /** Is the field a table field? Example = "false" */
        tableField: boolean;
        /**
         * The value to be formatted.
         * @example 45000
         */
        value: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpSingleValue, any>({
        path: `/r/${clientId}/methods/formatDbFieldValue`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Log out from the abas ERP REST API.
     *
     * @tags Miscellaneous
     * @name Logout
     * @summary Log out.
     * @request GET:/r/{clientId}/logout
     */
    logout: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeError, any>({
        path: `/r/${clientId}/logout`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description The root resource for infosystems. Returns links to child resources.
     *
     * @tags Infosystem
     * @name Get11
     * @summary Infosystem root resource.
     * @request GET:/r/{clientId}/infosys
     */
    get11: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/infosys`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns a list with metadata for all infosystems. If you need more metadata for an infosystem, visit the metadata resource for that infosystem.
     *
     * @tags Infosystem, Metadata
     * @name GetInfosystemList
     * @summary Metadata for all ERP infosystems.
     * @request GET:/r/{clientId}/infosys/meta
     */
    getInfosystemList: (
      clientId: string,
      query?: {
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpInfosystemDescriptorList, any>({
        path: `/r/${clientId}/infosys/meta`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns a list with metadata for ERP infosystems in a workspace. If you need more metadata for an infosystem, visit the metadata resource for that infosystem.
     *
     * @tags Infosystem, Metadata
     * @name GetWorkspaceList
     * @summary Metadata for ERP infosystems in a workspace.
     * @request GET:/r/{clientId}/infosys/meta/{workspace}
     */
    getWorkspaceList: (
      clientId: string,
      workspace: string,
      query?: {
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpInfosystemDescriptorList, any>({
        path: `/r/${clientId}/infosys/meta/${workspace}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Metadata for an infosystem and its fields.
     *
     * @tags Infosystem, Metadata
     * @name GetSingleInfosystem
     * @summary Metadata for an infosystem.
     * @request GET:/r/{clientId}/infosys/meta/{workspace}/{searchWord}
     */
    getSingleInfosystem: (
      clientId: string,
      workspace: string,
      searchWord: string,
      query?: {
        /**
         * Sets the "VARLANG" EDP option. Variable names must be specified in this language in all positions.
         * @default "DE"
         */
        variableLanguage?: 'de' | 'en';
        /**
         * Comma-separated list of header fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        selHeadFields?: string;
        /**
         * Comma-separated list of table fields. Use "-" for empty field list and "*" for all fields.
         * @example "id,nummer,such,sucherw"
         */
        selTableFields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpInfosystemMeta, any>({
        path: `/r/${clientId}/infosys/meta/${workspace}/${searchWord}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List metadata of call parameters that can be used from the infosystem. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * Query permission for database "12:26". * Query permission for database "65:1".
     *
     * @tags Infosystem, Metadata
     * @name GetDestinations1
     * @summary Metadata of call parameters for an infosystem.
     * @request GET:/r/{clientId}/infosys/meta/{workspace}/{searchWord}/destinations
     */
    getDestinations1: (
      clientId: string,
      workspace: string,
      searchWord: string,
      query?: {
        /** Filter by table property. Set to "true" to only receive call parameters for rows. Set to "false" for call parameters for header. */
        table?: boolean;
        /** Filter by custom property. Set to "true" to only receive custom call parameters. Set to "false" for standard call parameters. */
        custom?: boolean;
        /** Filter by common property. Set to "true" to only receive common call parameters. Set to "false" for call parameters this table only. */
        common?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpCallParameters, any>({
        path: `/r/${clientId}/infosys/meta/${workspace}/${searchWord}/destinations`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all infosystems of the ERP client The user must have the following ERP permissions to access this resource: * Query permission for database "65:1".
     *
     * @tags Infosystem
     * @name GetAll
     * @summary List of infosystems.
     * @request GET:/r/{clientId}/infosys/data
     */
    getAll: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/infosys/data`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description List all infosystems of the workspace The user must have the following ERP permissions to access this resource: * Query permission for database "65:1".
     *
     * @tags Infosystem
     * @name GetForWorkspace
     * @summary List of infosystems for a workspace.
     * @request GET:/r/{clientId}/infosys/data/{workspace}
     */
    getForWorkspace: (clientId: string, workspace: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseLinkList, any>({
        path: `/r/${clientId}/infosys/data/${workspace}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description List infosystems that can be called in the infosystem. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * The infosystem "st/AUFRUFPARAMETER" should be runnable by user.
     *
     * @tags Infosystem
     * @name GetInfosystems2
     * @summary List infosystems for an infosystem.
     * @request GET:/r/{clientId}/infosys/data/{workspace}/{searchWord}/infosystems
     */
    getInfosystems2: (
      clientId: string,
      workspace: string,
      searchWord: string,
      query?: {
        /**
         * Context row. Use "0" for header.
         * @default "0"
         */
        rowSpec?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EnvelopeErpResponseErpActionListItem, any>({
        path: `/r/${clientId}/infosys/data/${workspace}/${searchWord}/infosystems`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description List actions that can be executed in the infosystem. The user must have the following ERP permissions to access this resource: * Query permission for database "87:9". * The infosystem "st/AUFRUFPARAMETER" should be runnable by user.
     *
     * @tags Infosystem
     * @name GetActions2
     * @summary List actions for an infosystem.
     * @request GET:/r/{clientId}/infosys/data/{workspace}/{searchWord}/actions
     */
    getActions2: (clientId: string, workspace: string, searchWord: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseErpActionListItem, any>({
        path: `/r/${clientId}/infosys/data/${workspace}/${searchWord}/actions`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description View an image converted to either JPEG, GIF or PNG. Alternatively the image can be downloaded without any conversions in which case all image formats are supported.
     *
     * @tags Miscellaneous
     * @name Download
     * @summary View an image.
     * @request GET:/r/{clientId}/images
     */
    download: (
      clientId: string,
      query?: {
        /** Download the image without any conversion. */
        raw?: boolean;
        /**
         * The name of the image file.
         * @example "win/traktor.png"
         */
        fileName?: string;
        /**
         * Maximum width of the image. Actual width might be smaller due to actual size, aspect ratio, or "scale" parameter.
         * @format int32
         */
        maxWidth?: number;
        /**
         * Maximum height of the image. Actual height might be smaller due to actual size, aspect ratio, or "scale" parameter.
         * @format int32
         */
        maxHeight?: number;
        /**
         * Scale factor for the image
         * @format double
         * @example 1
         */
        scale?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/images`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description View an image converted to either JPEG, GIF or PNG. Maximum resolution is restricted, but results will be cached.
     *
     * @tags Miscellaneous
     * @name DownloadThumbnail
     * @summary Download a thumbnail of an image.
     * @request GET:/r/{clientId}/images/thumbnails
     */
    downloadThumbnail: (
      clientId: string,
      query: {
        /**
         * The name of the image file.
         * @example "win/traktor.png"
         */
        fileName: string;
        /**
         * Maximum width of the image. Actual width might be smaller due to actual size or aspect ratio.
         * @format int32
         * @default 32
         */
        maxWidth?: number;
        /**
         * Maximum height of the image. Actual height mightbe smaller due to actual size or aspect ratio.
         * @format int32
         * @default 32
         */
        maxHeight?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/images/thumbnails`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Get the EDP log for a specified request ID.
     *
     * @tags Miscellaneous
     * @name GetEdpLogSnippet
     * @summary Get EDP log for a request.
     * @request GET:/r/{clientId}/edplog
     */
    getEdpLogSnippet: (
      clientId: string,
      query?: {
        /** Get the EDP log for a specified request ID. The request ID can be found in the 'mw-request-id' response header field of the http request in question. */
        requestId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/edplog`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Download a file from the specified abas client. The users must have permissions to read the file.
     *
     * @tags Miscellaneous
     * @name Download1
     * @summary Download a file from abas ERP
     * @request GET:/r/{clientId}/download
     */
    download1: (
      clientId: string,
      query: {
        /**
         * The name of the file.
         * @example "ow1/FILE.EXT"
         */
        fileName: string;
        /** Override the file name in the Content-Disposition response header. */
        targetFileName?: string;
        /** Working set ID of the editor for the "editorId" parameter. */
        workingSetId?: string;
        /** If the download is part of a blocking action, the editor can be notified when the download is finished. */
        editorId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/r/${clientId}/download`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description The about information about an abas ERP client.
     *
     * @tags Miscellaneous
     * @name GetAbout
     * @summary Get information about an abas ERP client.
     * @request GET:/r/{clientId}/about
     */
    getAbout: (clientId: string, params: RequestParams = {}) =>
      this.request<EnvelopeErpResponseErpAbout, any>({
        path: `/r/${clientId}/about`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
