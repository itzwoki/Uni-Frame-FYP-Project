# This script works for Node.js and React.js projects.
# Put this in the root folder of your project.
# Run the command: .\get_code_context.ps1

# Use the current directory as the project directory
$project_dir = Get-Location

# Use a fixed name for the output file in the current directory
$output_file = Join-Path $project_dir "code_context.txt"

# Check if the output file exists and remove it if it does
if (Test-Path $output_file) {
    Remove-Item $output_file
}

# List of directories to look for
$directories = @("components", "pages", "app", "api", "styles", "utils", "hooks", "constants", "services", "types", "src", "routes", "middleware", "models", "controllers")

# List of file types to ignore
$ignore_files = @("*.ico", "*.png", "*.jpg", "*.jpeg", "*.gif", "*.svg", "*.json", "*.md", "*.lock", "*.env", "*.test.*", "*.spec.*", "*.snap")

# Function to read files and append their content
function Read-Files {
    param (
        [string]$path
    )

    Get-ChildItem -Path $path -Recurse | ForEach-Object {
        if ($_.PSIsContainer) {
            Read-Files -path $_.FullName
        } else {
            $should_ignore = $false
            foreach ($ignore_pattern in $ignore_files) {
                if ($_.Name -like $ignore_pattern) {
                    $should_ignore = $true
                    break
                }
            }
            if (-not $should_ignore) {
                $relative_path = $_.FullName.Substring($project_dir.Length + 1)
                Add-Content -Path $output_file -Value "// File: $relative_path"
                Get-Content -Path $_.FullName | Add-Content -Path $output_file
                Add-Content -Path $output_file -Value ""
            }
        }
    }
}

# Call the function for each specified directory in the project directory
foreach ($dir in $directories) {
    $full_path = Join-Path $project_dir $dir
    if (Test-Path $full_path) {
        Read-Files -path $full_path
    }
}

Write-Output "Code context has been saved to $output_file"
