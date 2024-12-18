import os

# Define the target directory
SRC_DIR = "./src/components"

def process_file(file_path: str):
    """Adds 'use client'; to the top of a .tsx file if not already present."""
    with open(file_path, "r+", encoding="utf-8") as file:
        content = file.readlines()

        # Check if "use client"; is already present
        if content and content[0].strip() == '"use client";':
            print(f"Skipped (already exists): {file_path}")
            return
        
        # Insert "use client"; at the top with a clean newline
        content.insert(0, '"use client";\n\n')

        # Rewrite the file with updated content
        file.seek(0)
        file.writelines(content)
        print(f"Updated: {file_path}")

def process_directory(directory: str):
    """Recursively processes all .tsx files in the specified directory."""
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".tsx"):
                file_path = os.path.join(root, file)
                process_file(file_path)

if __name__ == "__main__":
    if not os.path.exists(SRC_DIR):
        print(f"Error: Directory '{SRC_DIR}' does not exist.")
    else:
        print(f"Processing .tsx files in '{SRC_DIR}'...")
        process_directory(SRC_DIR)
        print("Processing complete.")
