import { Mesh, Vector2 } from "three";

export const animateMesh = (
  m: Mesh,
  rotationStep: { x?: number; y?: number; z?: number }
) => {
  m.rotation.x += rotationStep.x || 0;
  m.rotation.y += rotationStep.y || 0;
  m.rotation.z += rotationStep.z || 0;
};

// meh, not really reusable
let step = 0;
export const bounceMesh = (m: Mesh, speed: number, offset: number) => {
  step += speed;
  m.position.y = 10 * Math.abs(Math.sin(step)) + offset;
};

export const initMouseListener = (mousePosition: Vector2) => {
  window.addEventListener("pointermove", (e) => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
};
