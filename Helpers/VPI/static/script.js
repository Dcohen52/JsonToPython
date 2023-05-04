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

  workspace.addEventListener('dragover', event => {
    event.preventDefault();
  });

  workspace.addEventListener('drop', event => {
    event.preventDefault();
    const blockText = event.dataTransfer.getData('text/plain');

    if (blockText === 'Variable') {
      const varName = prompt('Enter the variable name:');
      const value = prompt('Enter the value:');
      if (value === null) {
        return; // User clicked cancel
      }
      const blockElement = document.createElement('div');
      blockElement.innerText = `${varName} = ${value}`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'Function') {
      const funcName = prompt('Enter the function name:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `def ${funcName}():`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'If Statement') {
      const condition = prompt('Enter the condition:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `if ${condition}:`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'While Loop') {
      const condition = prompt('Enter the condition:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `while ${condition}:`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'For Loop') {
      const iterVariable = prompt('Enter the iterator variable:');
      const iterable = prompt('Enter the iterable:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `for ${iterVariable} in ${iterable}:`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'Return') {
      const value = prompt('Enter the return value:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `return ${value}`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'Print') {
      const value = prompt('Enter the value to print:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `print(${value})`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'Input') {
      const value = prompt('Enter the value to input:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `input(${value})`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'String') {
      const value = prompt('Enter the string:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `str(${value})`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'Integer') {
      const value = prompt('Enter the integer:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `int(${value})`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'Float') {
      const value = prompt('Enter the float:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `float(${value})`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else if (blockText === 'Boolean') {
      const value = prompt('Enter the boolean:');
      const blockElement = document.createElement('div');
      blockElement.innerText = `bool(${value})`;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    } else {
      const blockElement = document.createElement('div');
      blockElement.innerText = blockText;
      blockElement.classList.add('block');
      workspace.appendChild(blockElement);
    }

    makeBlocksDraggable();
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

  // Convert the Python code to JSON structure
  const transpilerData = {
    python_code: pythonCode
  };

  fetch('/transpile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transpilerData)
  })
  .then(response => response.json())
  .then(data => {
    const jsonCode = JSON.stringify(data, null, 2);

    // Display the Python code and JSON code on the page
    const pythonCodeElement = document.getElementById('python-code');
    pythonCodeElement.innerText = pythonCode;

    const jsonCodeElement = document.getElementById('json-code');
    jsonCodeElement.innerText = jsonCode;
  })
  .catch(error => console.error('Error:', error));
}


    // Initialize draggable blocks and droppable workspace
    makeBlocksDraggable();
    makeWorkspaceDroppable();

    // Load the workspace state when the page loads
    window.addEventListener('load', loadWorkspaceState);

    // Add event listener to the "Convert to Python and JSON" button
    const convertButton = document.getElementById('convert-button');
    convertButton.addEventListener('click', convertToPythonAndJSON);