$files = Get-ChildItem -Path 'c:\Users\User\NOLA-SMS-PRO-DOCUMENTATION\src' -Recurse -Filter '*.tsx'
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    $c = $c -replace 'slate-655','slate-600'
    $c = $c -replace 'slate-850','slate-800'
    $c = $c -replace 'slate-905','slate-900'
    $c = $c -replace 'slate-150','slate-100'
    $c = $c -replace 'slate-250','slate-200'
    $c = $c -replace 'slate-305','slate-300'
    $c = $c -replace 'slate-350','slate-400'
    $c = $c -replace 'slate-405','slate-400'
    $c = $c -replace 'slate-955','slate-900'
    Set-Content $f.FullName $c -NoNewline
}
Write-Host "Done patching $($files.Count) files."
