# $JSON = Get-Content ".\src\assets\config.json" | Out-String | ConvertFrom-Json
#$VERSION=$JSON.version
$VERSION="1.1.2"
$ID = docker build -q -t lszabados/erc-abas-backend:$VERSION .
docker tag $ID docker.pkg.github.com/lszabados/erc/abasbackend:$VERSION
docker login docker.pkg.github.com -u lszabados -p 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
docker push docker.pkg.github.com/lszabados/erc/abasbackend:$VERSION