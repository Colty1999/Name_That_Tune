import os

def process_scss_files():
    # Step 1: Find all .scss files
    scss_files = []
    for root, _, files in os.walk('.'):
        for file in files:
            if file.endswith('.scss'):
                scss_files.append(os.path.join(root, file))
    
    # Step 2: Wrap each .scss file's content with * { ... }
    for scss_file in scss_files:
        with open(scss_file, 'r') as file:
            content = file.read()
        
        # Add * { at the beginning and } at the end if not already present
        wrapped_content = f"* {{\n{content}\n}}"
        
        with open(scss_file, 'w') as file:
            file.write(wrapped_content)
    
    # Step 3: Generate import statements
    imports = [f'import "../{os.path.relpath(scss_file).replace("\\\\", "/")}";' for scss_file in scss_files]
    
    # Save the import list to a file or print it
    with open('scss_imports.js', 'w') as output_file:
        output_file.write('\n'.join(imports))
    
    print(f"Processed {len(scss_files)} .scss files.")
    print(f"Import list saved to scss_imports.js.")

if __name__ == "__main__":
    process_scss_files()
