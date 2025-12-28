# Cloud Build GitHub Triggers creation script
param(
  [Parameter(Mandatory=$true)][string]$RepoOwner,
  [Parameter(Mandatory=$true)][string]$RepoName,
  [string]$ProjectId = "maxnate-africa-website",
  [string]$Region = "africa-south1"
)

Write-Host "Creating Cloud Build triggers for $RepoOwner/$RepoName" -ForegroundColor Cyan

# Locate gcloud
$candidatePaths = @(
  "C:\\Google\\CloudSDK\\google-cloud-sdk\\bin",
  "$env:ProgramFiles\\Google\\Cloud SDK\\google-cloud-sdk\\bin",
  "$env:ProgramFiles(x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin",
  "$env:LocalAppData\\Google\\Cloud SDK\\google-cloud-sdk\\bin"
)
$binPath = $candidatePaths | Where-Object { Test-Path (Join-Path $_ "gcloud.cmd") } | Select-Object -First 1
if (-not $binPath) { Write-Host "gcloud not found" -ForegroundColor Red; exit 1 }
$gcloud = Join-Path $binPath "gcloud.cmd"

# Ensure project
& $gcloud config set project $ProjectId | Out-Null

# Create MAIN trigger
Write-Host "Creating trigger: maxnate-main" -ForegroundColor Yellow
& $gcloud beta builds triggers create github `
  --name="maxnate-main" `
  --repo-owner=$RepoOwner `
  --repo-name=$RepoName `
  --branch-pattern="^main$" `
  --build-config=".cloudbuild/cloudbuild.yaml" `
  --substitutions="_REGION=$Region,_ARTIFACT_REPO=maxnate-registry,_SERVICE_NAME=maxnate-website,_MEMORY=1Gi,_CPU=1,_MIN_INSTANCES=0,_MAX_INSTANCES=10,_CONCURRENCY=80" 

# Create DEVELOP trigger
Write-Host "Creating trigger: maxnate-develop" -ForegroundColor Yellow
& $gcloud beta builds triggers create github `
  --name="maxnate-develop" `
  --repo-owner=$RepoOwner `
  --repo-name=$RepoName `
  --branch-pattern="^develop$" `
  --build-config=".cloudbuild/cloudbuild.yaml" `
  --substitutions="_REGION=$Region,_ARTIFACT_REPO=maxnate-registry,_SERVICE_NAME=maxnate-website,_MEMORY=1Gi,_CPU=1,_MIN_INSTANCES=0,_MAX_INSTANCES=10,_CONCURRENCY=80" 

# List triggers
Write-Host "Listing triggers" -ForegroundColor Green
& $gcloud beta builds triggers list