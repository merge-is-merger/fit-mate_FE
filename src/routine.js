/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {blocks} from './blocks/text';
import {forBlock} from './generators/javascript';
import {javascriptGenerator} from 'blockly/javascript';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './routine.css';


// Register the blocks and generator with Blockly
//Blockly.common.defineBlocks(blocks);
//Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {toolbox});

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = javascriptGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;

  outputDiv.innerHTML = '';

  eval(code);
};

// Load the initial state from storage and run the code.
load(workspace);
runCode();

// Every time the workspace changes state, save the changes to storage.
workspace.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(workspace);
});

// Whenever the workspace changes meaningfully, run the code again.
workspace.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});


Blockly.JavaScript['chest_press'] = function(block) {
  return '체스트 프레스 운동을 수행합니다.\n';
};

Blockly.JavaScript['incline_push_up'] = function(block) {
  return '인클라인 푸시업 운동을 수행합니다.\n';
};

Blockly.JavaScript['peck_deck_fly'] = function(block) {
  return '펙 덱 플라이 운동을 수행합니다.\n';
};

Blockly.JavaScript['chest_exercise_category'] = function(block) {
  var statements_exercises = Blockly.JavaScript.statementToCode(block, 'EXERCISES');
  return '가슴 운동 루틴:\n' + statements_exercises;
};

Blockly.JavaScript['Lever_Front_Pulldown'] = function(block) {
  return '레버 프론트 풀 다운 운동을 수행합니다.\n';
};

Blockly.JavaScript['Pull_Up'] = function(block) {
  return '풀 업 운동을 수행합니다.\n';
};

Blockly.JavaScript['Cable_Rear_Pulldown'] = function(block) {
  return '케이블 리어 풀 다운 운동을 수행합니다.\n';
};

Blockly.JavaScript['back_exercise_category'] = function(block) {
  var statements_exercises = Blockly.JavaScript.statementToCode(block, 'EXERCISES');
  return '등 운동 루틴:\n' + statements_exercises;
};

Blockly.JavaScript['SMITH_MACHINE_SHOULDER_PRESS'] = function(block) {
  return '스미스 머신 숄더 프레스 운동을 수행합니다.\n';
};

Blockly.JavaScript['FLY_MACHINE'] = function(block) {
  return '플라이 머신 운동을 수행합니다.\n';
};

Blockly.JavaScript['FACE_FULL'] = function(block) {
  return '페이스 풀 다운 운동을 수행합니다.\n';
};

Blockly.JavaScript['shoulder_exercise_category'] = function(block) {
  var statements_exercises = Blockly.JavaScript.statementToCode(block, 'EXERCISES');
  return '어깨 운동 루틴:\n' + statements_exercises;
};

Blockly.JavaScript['Dumbbell_Reverse_Curl'] = function(block) {
  return '덤벨 리버스 컬 운동을 수행합니다.\n';
};

Blockly.JavaScript['Dumbbell_Seated_Neutral_Wrist_Curl'] = function(block) {
  return '덤벨 시티드 뉴트럴 리스트 컬 운동을 수행합니다.\n';
};

Blockly.JavaScript['Water_Bottle_Hammer_Curl'] = function(block) {
  return '물병 해머 컬 운동을 수행합니다.\n';
};

Blockly.JavaScript['arm_exercise_category'] = function(block) {
  var statements_exercises = Blockly.JavaScript.statementToCode(block, 'EXERCISES');
  return '팔 운동 루틴:\n' + statements_exercises;
};

Blockly.JavaScript['Dumbbell_Walking_Lunge'] = function(block) {
  return '덤벨 워킹 런지 운동을 수행합니다.\n';
};

Blockly.JavaScript['Dumbbell_Goblet_Squat'] = function(block) {
  return '덤벨 데드리프트 운동을 수행합니다.\n';
};

Blockly.JavaScript['Dumbbell_Goblet_Squat'] = function(block) {
  return '물병 고블릿 스쿼트 운동을 수행합니다.\n';
};

Blockly.JavaScript['lower_body_exercise_category'] = function(block) {
  var statements_exercises = Blockly.JavaScript.statementToCode(block, 'EXERCISES');
  return '하체 운동 루틴:\n' + statements_exercises;
};

// 운동 루틴 생성 함수
function generateRoutine() {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('generatedCode').textContent = code;
}

// 작업 영역 변경 시 운동 루틴 자동 생성
workspace.addChangeListener(generateRoutine);