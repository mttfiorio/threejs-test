import { Mesh } from "three";
("three");

export const animateMesh = (
  m: Mesh,
  rotationStep: { x?: number; y?: number; z?: number }
) => {
  m.rotation.x += rotationStep.x || 0;
  m.rotation.y += rotationStep.y || 0;
  m.rotation.z += rotationStep.z || 0;
};

let step = 0;
export const bounceMesh = (m: Mesh, speed: number, offset: number) => {
  step += speed;
  m.position.y = 10 * Math.abs(Math.sin(step)) + offset;
};
