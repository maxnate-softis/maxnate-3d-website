# Google Cloud SDK Installation Script for Windows
# Run this script as Administrator

Write-Host "Installing Google Cloud SDK..." -ForegroundColor Green

# Download the installer
$installerUrl = "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe"
$installerPath = "$env:TEMP\GoogleCloudSDKInstaller.exe"

Write-Host "Downloading installer..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath

# Run the installer silently
Write-Host "Running installer..." -ForegroundColor Yellow
Start-Process -FilePath $installerPath -ArgumentList "/S /D=C:\Google\CloudSDK" -Wait

# Add to PATH
$cloudSdkPath = "C:\Google\CloudSDK\google-cloud-sdk\bin"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")

if ($currentPath -notlike "*$cloudSdkPath*") {
    Write-Host "Adding to PATH..." -ForegroundColor Yellow
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$cloudSdkPath", "Machine")
}

# Refresh environment
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Installation complete! Please restart your terminal." -ForegroundColor Green
Write-Host "Then run: gcloud version" -ForegroundColor Cyan