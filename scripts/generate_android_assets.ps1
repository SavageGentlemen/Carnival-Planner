Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\rift\Desktop\Carnival-Planner\public\carnival592x592.png"
$resDir = "c:\Users\rift\Desktop\Carnival-Planner\android\app\src\main\res"

$src = [System.Drawing.Image]::FromFile($srcPath)

# Launcher icons (standard sizes)
$sizes = @(
    @{name="mipmap-mdpi"; s=48},
    @{name="mipmap-hdpi"; s=72},
    @{name="mipmap-xhdpi"; s=96},
    @{name="mipmap-xxhdpi"; s=144},
    @{name="mipmap-xxxhdpi"; s=192}
)

foreach ($item in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($item.s, $item.s)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($src, 0, 0, $item.s, $item.s)
    
    $outPath = Join-Path $resDir "$($item.name)\ic_launcher.png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $roundPath = Join-Path $resDir "$($item.name)\ic_launcher_round.png"
    $bmp.Save($roundPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Saved $($item.name) at $($item.s)x$($item.s)"
}

# Foreground layer for adaptive icons (with safe zone padding)
$fgSizes = @(
    @{name="mipmap-mdpi"; s=108},
    @{name="mipmap-hdpi"; s=162},
    @{name="mipmap-xhdpi"; s=216},
    @{name="mipmap-xxhdpi"; s=324},
    @{name="mipmap-xxxhdpi"; s=432}
)

foreach ($item in $fgSizes) {
    $bmp = New-Object System.Drawing.Bitmap($item.s, $item.s)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $padding = [int]($item.s * 0.25)
    $innerSize = $item.s - (2 * $padding)
    $g.DrawImage($src, $padding, $padding, $innerSize, $innerSize)
    
    $outPath = Join-Path $resDir "$($item.name)\ic_launcher_foreground.png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Saved foreground $($item.name) at $($item.s)x$($item.s)"
}

# Splash screen image (480x800 for drawable)
$splashBmp = New-Object System.Drawing.Bitmap(480, 800)
$sg = [System.Drawing.Graphics]::FromImage($splashBmp)
$sg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Fill with gradient-like solid (deep purple matching your app)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#3a1c71"))
$sg.FillRectangle($brush, 0, 0, 480, 800)

# Center the logo
$logoSize = 200
$logoX = (480 - $logoSize) / 2
$logoY = (800 - $logoSize) / 2
$sg.DrawImage($src, [int]$logoX, [int]$logoY, $logoSize, $logoSize)

$splashPath = Join-Path $resDir "drawable\splash.png"
$splashBmp.Save($splashPath, [System.Drawing.Imaging.ImageFormat]::Png)
$sg.Dispose()
$splashBmp.Dispose()
$brush.Dispose()
Write-Host "Saved splash screen"

# Generate splash screens for all density drawables
$splashSizes = @(
    @{name="drawable-port-hdpi"; w=480; h=800},
    @{name="drawable-port-mdpi"; w=320; h=480},
    @{name="drawable-port-xhdpi"; w=720; h=1280},
    @{name="drawable-port-xxhdpi"; w=960; h=1600},
    @{name="drawable-port-xxxhdpi"; w=1280; h=1920},
    @{name="drawable-land-hdpi"; w=800; h=480},
    @{name="drawable-land-mdpi"; w=480; h=320},
    @{name="drawable-land-xhdpi"; w=1280; h=720},
    @{name="drawable-land-xxhdpi"; w=1600; h=960},
    @{name="drawable-land-xxxhdpi"; w=1920; h=1280}
)

foreach ($item in $splashSizes) {
    $bmp = New-Object System.Drawing.Bitmap($item.w, $item.h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#3a1c71"))
    $g.FillRectangle($bgBrush, 0, 0, $item.w, $item.h)
    
    $minDim = [Math]::Min($item.w, $item.h)
    $logoSz = [int]($minDim * 0.4)
    $lx = ($item.w - $logoSz) / 2
    $ly = ($item.h - $logoSz) / 2
    $g.DrawImage($src, [int]$lx, [int]$ly, $logoSz, $logoSz)
    
    $outPath = Join-Path $resDir "$($item.name)\splash.png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $bmp.Dispose()
    $bgBrush.Dispose()
    Write-Host "Saved $($item.name) splash"
}

$src.Dispose()
Write-Host "All assets generated!"
