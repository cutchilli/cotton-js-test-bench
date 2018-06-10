import "babel-polyfill";
import { runGalaxy } from './team-cotton-galaxy';
import { runInputTest } from './input-test';
import { runTraitTest } from './trait-test';
import { runSoundTest } from './sound-test';
import { runtSpriteTest } from './sprite-test';
 
const tests = [
  runGalaxy,
  runInputTest,
  runTraitTest,
  runSoundTest,
  runtSpriteTest
];

const rootEl = document.getElementById('test-buttons');

tests.forEach((test) => {
  const testButton = document.createElement('button');
  testButton.innerHTML = test.name;
  testButton.style = 'margin: 10px;';
  testButton.onclick = async () => {
    test();

    rootEl.hidden = true;
  };
  rootEl.appendChild(testButton);
});
