#!/bin/bash

# Check if a folder name was provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <folder-name>"
  exit 1
fi



# Create a new folder
mkdir src/"$1"

# Move into the new folder
cd src/"$1" || exit

# Create some sample files
touch file1.txt
echo "Hello, World!" > file1.txt

touch file2.txt
echo "This is a sample file." > file2.txt

echo "New folder and files created successfully!"
