# =============================================================================
# MAXNATE 3D WEBSITE - GCP INFRASTRUCTURE SETUP SCRIPT
# Run this script to set up all GCP resources
# =============================================================================

# Configuration Variables
$PROJECT_ID = "maxnate-africa-website"
$REGION = "africa-south1"
$SERVICE_NAME = "maxnate-website"
$ARTIFACT_REPO = "maxnate-registry"
$STORAGE_BUCKET = "maxnate-assets"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "MAXNATE AFRICA - GCP INFRASTRUCTURE SETUP" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if gcloud is installed
Write-Host "[Step 1] Checking gcloud CLI..." -ForegroundColor Yellow
if (!(Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Host "gcloud not found in PATH, attempting to locate..." -ForegroundColor Yellow
    $candidatePaths = @(
        "C:\\Google\\CloudSDK\\google-cloud-sdk\\bin",
        "$env:ProgramFiles\\Google\\Cloud SDK\\google-cloud-sdk\\bin",
        "$env:ProgramFiles(x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin",
        "$env:LocalAppData\\Google\\Cloud SDK\\google-cloud-sdk\\bin"
    )
    $binPath = $candidatePaths | Where-Object { Test-Path (Join-Path $_ "gcloud.cmd") } | Select-Object -First 1
    if ($binPath) {
        Write-Host "Found gcloud at: $binPath" -ForegroundColor Green
        $env:Path = "$binPath;" + $env:Path
    } else {
        Write-Host "Error: gcloud CLI is not installed or not found. Please install it first:" -ForegroundColor Red
        Write-Host "https://cloud.google.com/sdk/docs/install" -ForegroundColor Gray
        exit 1
    }
}
Write-Host "gcloud CLI found!" -ForegroundColor Green

# Step 2: Authenticate
Write-Host ""
Write-Host "[Step 2] Authenticating with Google Cloud..." -ForegroundColor Yellow
gcloud auth login

# Step 3: Create or set project
Write-Host ""
Write-Host "[Step 3] Setting up project: $PROJECT_ID" -ForegroundColor Yellow
$existingProject = gcloud projects describe $PROJECT_ID 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Creating new project..." -ForegroundColor Gray
    gcloud projects create $PROJECT_ID --name="Maxnate Africa Website"
} else {
    Write-Host "Project already exists, using existing project." -ForegroundColor Gray
}
gcloud config set project $PROJECT_ID
Write-Host "Project configured!" -ForegroundColor Green

# Step 4: Enable required APIs
Write-Host ""
Write-Host "[Step 4] Enabling required APIs..." -ForegroundColor Yellow
$apis = @(
    "cloudbuild.googleapis.com",
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "storage.googleapis.com",
    "secretmanager.googleapis.com",
    "cloudresourcemanager.googleapis.com"
)

foreach ($api in $apis) {
    Write-Host "  Enabling $api..." -ForegroundColor Gray
    gcloud services enable $api
}
Write-Host "APIs enabled!" -ForegroundColor Green

# Step 5: Create Artifact Registry repository
Write-Host ""
Write-Host "[Step 5] Creating Artifact Registry repository..." -ForegroundColor Yellow
$existingRepo = gcloud artifacts repositories describe $ARTIFACT_REPO --location=$REGION 2>$null
if ($LASTEXITCODE -ne 0) {
    gcloud artifacts repositories create $ARTIFACT_REPO `
        --repository-format=docker `
        --location=$REGION `
        --description="Docker images for Maxnate website"
    Write-Host "Artifact Registry created!" -ForegroundColor Green
} else {
    Write-Host "Artifact Registry already exists." -ForegroundColor Gray
}

# Step 6: Create Cloud Storage bucket for assets
Write-Host ""
Write-Host "[Step 6] Creating Cloud Storage bucket for 3D assets..." -ForegroundColor Yellow
$bucketName = "gs://$STORAGE_BUCKET-$PROJECT_ID"
$existingBucket = gsutil ls $bucketName 2>$null
if ($LASTEXITCODE -ne 0) {
    gsutil mb -l $REGION $bucketName
    # Enable CDN-friendly settings
    gsutil cors set cors.json $bucketName
    gsutil iam ch allUsers:objectViewer $bucketName
    Write-Host "Storage bucket created!" -ForegroundColor Green
} else {
    Write-Host "Storage bucket already exists." -ForegroundColor Gray
}

# Step 7: Set up Cloud Build triggers
Write-Host ""
Write-Host "[Step 7] Creating Cloud Build triggers..." -ForegroundColor Yellow
Write-Host "Note: You'll need to connect your GitHub repository in the GCP Console." -ForegroundColor Gray
Write-Host "Visit: https://console.cloud.google.com/cloud-build/triggers" -ForegroundColor Gray

# Step 8: Create secrets in Secret Manager (optional)
Write-Host ""
Write-Host "[Step 8] Setting up Secret Manager..." -ForegroundColor Yellow
# Example: Create a placeholder secret
# gcloud secrets create api-keys --replication-policy="automatic"
Write-Host "Secret Manager ready. Add secrets as needed." -ForegroundColor Green

# Step 9: Display summary
Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "SETUP COMPLETE!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Project ID:        $PROJECT_ID" -ForegroundColor White
Write-Host "Region:            $REGION" -ForegroundColor White
Write-Host "Artifact Registry: $ARTIFACT_REPO" -ForegroundColor White
Write-Host "Storage Bucket:    $bucketName" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Connect your GitHub repository in Cloud Build" -ForegroundColor Gray
Write-Host "2. Configure Cloud Build triggers for main and develop branches" -ForegroundColor Gray
Write-Host "3. Upload 3D assets to the storage bucket" -ForegroundColor Gray
Write-Host "4. Run a test deployment" -ForegroundColor Gray
Write-Host ""
Write-Host "Manual deployment command:" -ForegroundColor Yellow
Write-Host "gcloud builds submit --config=.cloudbuild/cloudbuild.yaml" -ForegroundColor Cyan
