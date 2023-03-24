#!/bin/bash

# Check if a folder name was provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <folder-name>"
  exit 1
fi

# Create the folder if it doesn't exist
if [ ! -d "src/$1" ]; then
  mkdir "src/$1"
fi

# Create the JS file
cat << EOF > "src/pages/$1.js"
import React, { createContext, useContext, useState } from 'react';
import $(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Page from '../$1/$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Page';

const $(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Ctx = createContext({});

export default function $(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')() {
    const [$1Data, set$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Data] = useState({});

    function changeState() {
        set$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Data({ ...$1Data });
    }

    return (
        <$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Ctx.Provider value={{ $1Data, changeState }}>
            <$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Page />
        </$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Ctx.Provider>
    );
}

export const use$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Ctx = () => useContext($(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Ctx)
EOF

# Create the JS file
cat << EOF > "src/$1/$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Page.js"
import React from 'react';
import { use$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Ctx } from '../pages/$1';

export default function $(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Page() {
  const { $1Data, changeState } = use$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Ctx();

    return <div>$(echo $1 | sed 's/^./\U&/; s/-\([a-z]\)/\U\1/g')Page</div>;
}
EOF


echo "New folder and files created successfully!"
