$port = if ($env:PORT) { $env:PORT } else { '3000' }
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://+:$port/")
$listener.Start()
Write-Host "Servidor iniciado em http://localhost:$port (acessivel via ngrok)"
while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $local = $req.Url.LocalPath
    $path = 'D:\Claude' + $local.Replace('/', '\')
    if ($path -eq 'D:\Claude\') { $path = 'D:\Claude\index.html' }
    if (Test-Path $path -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($path)
        $ext = [System.IO.Path]::GetExtension($path)
        $mime = switch ($ext) {
            '.html' { 'text/html; charset=utf-8' }
            '.css'  { 'text/css' }
            '.js'   { 'application/javascript' }
            '.svg'  { 'image/svg+xml' }
            '.png'  { 'image/png' }
            '.jpg'  { 'image/jpeg' }
            '.ico'  { 'image/x-icon' }
            default { 'application/octet-stream' }
        }
        $res.ContentType = $mime
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $res.StatusCode = 404
    }
    $res.OutputStream.Close()
}
