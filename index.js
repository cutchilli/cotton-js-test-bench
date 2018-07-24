import { runGalaxy } from './team-cotton-galaxy';
import { runInputTest } from './input-test';
import { runTraitTest } from './trait-test';
import { runtSpriteTest } from './sprite-test';
import { runSatTest } from './sat-test';
import { runRotationTest } from './rotation-test';

const tests = [
  runGalaxy,
  runInputTest,
  runTraitTest,
  runtSpriteTest,
  runSatTest,
  runRotationTest,
];

const rootEl = document.getElementById('test-buttons');

tests.forEach((test) => {
  const testButton = document.createElement('button');
  testButton.innerHTML = test.name;
  testButton.style = 'margin: 10px;';
  testButton.onclick = () => {
    test();
    rootEl.hidden = true;
  };
  rootEl.appendChild(testButton);
});
