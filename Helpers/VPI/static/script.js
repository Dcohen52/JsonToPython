    // Function to make blocks draggable
    function makeBlocksDraggable() {
      const blocks = document.querySelectorAll('.block');

      blocks.forEach(block => {
        block.addEventListener('dragstart', event => {
          event.dataTransfer.setData('text/plain', block.innerText);
        });
      });
    }

function makeWorkspaceDroppable() {
  const workspace = document.getElementById('workspace');
  const resetButton = document.getElementById('reset-button');
  let indentLevel = 0;

  workspace.addEventListener('dragover', event => {
    event.preventDefault();
  });

  workspace.addEventListener('drop', event => {
    event.preventDefault();
    const blockText = event.dataTransfer.getData('text/plain');

    let pythonCode;

    if (blockText === 'Variable') {
      const varName = prompt('Enter the variable name:');
      const value = prompt('Enter the value:');
      if (value === null) {
        return; // User clicked cancel
      }
      pythonCode = `${'\t'.repeat(indentLevel)}${varName} = ${value}`;
    } else if (blockText === 'Function') {
      const funcName = prompt('Enter the function name:');
      const funcArgs = prompt('Enter the function arguments:');
      if (funcArgs === null) {
        return; // User clicked cancel
      }
      pythonCode = `${'\t'.repeat(indentLevel)}def ${funcName}(${funcArgs}):${'\t'.repeat(indentLevel + 1)}`;
      indentLevel += 1;
    } else if (blockText === 'If Statement') {
      const condition = prompt('Enter the condition:');
      const value = prompt('Enter the value:');
      if (value === null) {
        return; // User clicked cancel
      }
      pythonCode = `${'\t'.repeat(indentLevel)}if ${condition}:${'\t'.repeat(indentLevel + 1)}${value}`;
      indentLevel += 1;
    } else if (blockText === 'Else If Statement') {
        const condition = prompt('Enter the condition:');
        const value = prompt('Enter the value:');
        if (value === null) {
            return; // User clicked cancel
        }
        pythonCode = `${'\t'.repeat(indentLevel)}elif ${condition}:${'\t'.repeat(indentLevel + 1)}${value}`;
        indentLevel += 1;
    } else if (blockText === 'Else Statement') {
        const value = prompt('Enter the value:');
        if (value === null) {
            return; // User clicked cancel
        }
        pythonCode = `${'\t'.repeat(indentLevel)}else:${'\t'.repeat(indentLevel + 1)}${value}`;
        indentLevel += 1;
    } else if (blockText === 'While Loop') {
      const condition = prompt('Enter the condition:');
      pythonCode = `${'\t'.repeat(indentLevel)}while ${condition}:${'\t'.repeat(indentLevel + 1)}`;
      indentLevel += 1;
    } else if (blockText === 'For Loop') {
      const iterVariable = prompt('Enter the iterator variable:');
      const iterable = prompt('Enter the iterable:');
      pythonCode = `${'\t'.repeat(indentLevel)}for ${iterVariable} in ${iterable}:${'\t'.repeat(indentLevel + 1)}`;
      indentLevel += 1;
    } else if (blockText === 'Return') {
      const value = prompt('Enter the return value:');
      pythonCode = `${'\t'.repeat(indentLevel)}return ${value}`;
    } else if (blockText === 'Print') {
      const value = prompt('Enter the value to print:');
      pythonCode = `${'\t'.repeat(indentLevel)}print(${value})`;
    } else if (blockText === 'Input') {
      const value = prompt('Enter the value to input:');
      pythonCode = `${'\t'.repeat(indentLevel)}input(${value})`;
    } else if (blockText === 'String') {
      const value = prompt('Enter the string:');
      pythonCode = `${'\t'.repeat(indentLevel)}"${value}"`;
    } else if (blockText === 'Integer') {
      const value = prompt('Enter the integer:');
      pythonCode = `${'\t'.repeat(indentLevel)}${value}`;
    } else if (blockText === 'Float') {
      const value = prompt('Enter the float:');
      pythonCode = `${'\t'.repeat(indentLevel)}${value}`;
    } else if (blockText === 'Boolean') {
      const value = prompt('Enter the boolean (true/false):');
      pythonCode = `${'\t'.repeat(indentLevel)}${value === 'true' ? 'True' : 'False'}`;
    } else {
      return;
    }


const blockElement = document.createElement('div');
if (blockText === 'Variable') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-variable');
} else if (blockText === 'Function') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-function');
    blockElement.style.color = 'black';
} else if (blockText === 'If Statement') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-condition');
    blockElement.style.color = 'black';
} else if (blockText === 'Else If Statement') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-condition');
    blockElement.style.color = 'black';
} else if (blockText === 'Else Statement') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-condition');
    blockElement.style.color = 'black';
} else if (blockText === 'While Loop') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-loop');
    blockElement.style.color = 'black';
} else if (blockText === 'For Loop') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-loop');
    blockElement.style.color = 'black';
} else if (blockText === 'Return') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-function');
    blockElement.style.color = 'black';
} else if (blockText === 'Print') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-function');
    blockElement.style.color = 'black';
} else if (blockText === 'Input') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-variable');
} else if (blockText === 'String') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-data');
    blockElement.style.color = 'black';
} else if (blockText === 'Integer') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-data');
    blockElement.style.color = 'black';
} else if (blockText === 'Float') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-data');
    blockElement.style.color = 'black';
} else if (blockText === 'Boolean') {
    blockElement.classList.add('block');
    blockElement.classList.add('block-data');
    blockElement.style.color = 'black';
} else {
    blockElement.classList.add('block');
}

// Create the code element to display the Python code
const codeElement = document.createElement('pre');
codeElement.textContent = pythonCode;

// Wrap the block content in a container div
const blockContent = document.createElement('div');
blockContent.appendChild(codeElement);
blockElement.appendChild(blockContent);

// Add the draggable attribute to the block element
blockElement.draggable = true;

// Add event listeners for dragging the block
blockElement.addEventListener('dragstart', event => {
  event.dataTransfer.setData('text/plain', blockElement.innerText);
});

// Add event listener for removing the block when dragged outside the workspace
blockElement.addEventListener('dragend', event => {
  const target = event.target;
  const rect = workspace.getBoundingClientRect();
  const x = event.clientX;
  const y = event.clientY;

  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
    workspace.removeChild(target);
    saveWorkspaceState();
  }
});

// Append block to workspace
workspace.appendChild(blockElement);

    makeBlocksDraggable();
    saveWorkspaceState();
  });

    // Reset button event listener
  resetButton.addEventListener('click', () => {
    workspace.innerHTML = '';
    indentLevel = 0;
    saveWorkspaceState();
  });
}


// Function to save the workspace state
function saveWorkspaceState() {
  const workspace = document.getElementById('workspace');
  const blocks = Array.from(workspace.querySelectorAll('.block'));
  const workspaceData = {
    blocks: blocks.map(block => block.innerText)
  };

  fetch('/save_workspace', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workspaceData)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}

// Function to load the workspace state
function loadWorkspaceState() {
  fetch('/get_workspace')
  .then(response => response.json())
  .then(data => {
    const workspace = document.getElementById('workspace');
    workspace.innerHTML = '';
    data.blocks.forEach(blockText => {
      const blockElement = document.createElement('div');
      blockElement.innerText = blockText;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    });
    makeBlocksDraggable();
  })
  .catch(error => console.error('Error:', error));
}

// Function to convert blocks to Python and JSON code
function convertToPythonAndJSON() {
  const workspace = document.getElementById('workspace');
  const blocks = Array.from(workspace.querySelectorAll('.block'));
  const blockTexts = blocks.map(block => block.innerText);

  // Join the block texts into a Python code string
  const pythonCode = blockTexts.join('\n');
  console.log(pythonCode);

  // Convert the Python code to JSON structure
  const transpilerData = {
    python_code: pythonCode
  };

  fetch('/transpile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transpilerData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error transpiling the code. Please try again.'); // Handle non-200 response
      }
      return response.json();
    })
    .then((data) => {
      // Handle successful response and update UI
      const pythonCodeElement = document.getElementById('python-code');
      const jsonCodeElement = document.getElementById('json-code');
      pythonCodeElement.textContent = data.pythonCode;
      jsonCodeElement.textContent = JSON.stringify(data.jsonCode, null, 2);
    })
    .catch((error) => {
      // Handle error and display error message
      console.error(error);
      const pythonCodeElement = document.getElementById('python-code');
      const jsonCodeElement = document.getElementById('json-code');
      pythonCodeElement.textContent = 'Error transpiling the code. Please try again.';
      jsonCodeElement.textContent = '';
    });
}


// Initialize draggable blocks and droppable workspace
makeBlocksDraggable();
makeWorkspaceDroppable();

// Load the workspace state when the page loads
window.addEventListener('load', loadWorkspaceState);

// Add event listener to the "Convert to Python and JSON" button
const convertButton = document.getElementById('convert-button');
convertButton.addEventListener('click', convertToPythonAndJSON);