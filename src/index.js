// /**
//  * @license
//  * Copyright 2023 Google LLC
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import * as Blockly from 'blockly';
// import {blocks} from './blocks/text';
// import {forBlock} from './generators/javascript';
// import {javascriptGenerator} from 'blockly/javascript';
// import {save, load} from './serialization';
// import {toolbox} from './toolbox';
// import './index.css';

// // Register the blocks and generator with Blockly
// Blockly.common.defineBlocks(blocks);
// Object.assign(javascriptGenerator.forBlock, forBlock);

// // Set up UI elements and inject Blockly
// const codeDiv = document.getElementById('generatedCode').firstChild;
// const outputDiv = document.getElementById('output');
// const blocklyDiv = document.getElementById('blocklyDiv');
// const ws = Blockly.inject(blocklyDiv, {toolbox});

// // This function resets the code and output divs, shows the
// // generated code from the workspace, and evals the code.
// // In a real application, you probably shouldn't use `eval`.
// const runCode = () => {
//   const code = javascriptGenerator.workspaceToCode(ws);
//   codeDiv.innerText = code;

//   outputDiv.innerHTML = '';

//   eval(code);
// };

// // Load the initial state from storage and run the code.
// load(ws);
// runCode();

// // Every time the workspace changes state, save the changes to storage.
// ws.addChangeListener((e) => {
//   // UI events are things like scrolling, zooming, etc.
//   // No need to save after one of these.
//   if (e.isUiEvent) return;
//   save(ws);
// });

// // Whenever the workspace changes meaningfully, run the code again.
// ws.addChangeListener((e) => {
//   // Don't run the code when the workspace finishes loading; we're
//   // already running it once when the application starts.
//   // Don't run the code during drags; we might have invalid state.
//   if (
//     e.isUiEvent ||
//     e.type == Blockly.Events.FINISHED_LOADING ||
//     ws.isDragging()
//   ) {
//     return;
//   }
//   runCode();
// });
document.addEventListener('DOMContentLoaded', function() {
    const tryNowButtons = document.querySelectorAll('.TryNow, .TryNow2');

    tryNowButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            axios.get('http://localhost:8080/api/auth/session/status', {
                withCredentials: true
            })
            .then(response => {
                console.log('Session status response:', response); // 응답 로그 출력
                if (response.data === 'Logged in') {
                    window.location.href = 'challenge.html'; // 챌린지 페이지로 이동
                } else {
                    window.location.href = 'login.html'; // 세션이 유효하지 않은 경우 로그인 페이지로 이동
                }
            })
            .catch(error => {
                console.error('세션 상태 확인 중 오류 발생:', error);
                window.location.href = 'login.html'; // 오류 발생 시 로그인 페이지로 이동
            });
        });
    });
});