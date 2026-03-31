const codeLines = [
  '<span style="color:#7b2fff">INIT</span> <span style="color:#00d2ff">System_Control</span>;',
  '  <span style="color:#ffd700">L</span> <span style="color:#ff2d6e">"Sensor_Input_1"</span>;',
  '  <span style="color:#ffd700">A</span> <span style="color:#ff2d6e">"Safety_Gate"</span>;',
  '  <span style="color:#ffd700">=</span> <span style="color:#00ff9d">"Conveyor_Start"</span>;',
  '',
  '<span style="color:#7b2fff">OB1</span> { <span style="color:#6b7fa3">// Main Cycle</span> }',
  '  <span style="color:#ffd700">CALL</span> <span style="color:#00d2ff">FC_Robot_Pick</span>;',
  '  <span style="color:#ffd700">DB10.Status</span> := <span style="color:#00ff9d">"RUNNING"</span>;',
  '};',
  '',
  '<span style="color:#6b7fa3">// Building the Industry 4.0 future 🏭</span>',
];
