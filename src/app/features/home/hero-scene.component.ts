import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  viewChild
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-hero-scene',
  standalone: true,
  template: `
    <div class="scene-shell" aria-hidden="true">
      <canvas #canvas></canvas>
      <div class="scene-label scene-label--top">WEBGL / FRONTEND</div>
      <div class="scene-label scene-label--bottom">ACCESSIBLE UI</div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 420px;
    }

    .scene-shell {
      position: relative;
      width: 100%;
      min-height: 520px;
      overflow: hidden;
      border-left: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      background:
        linear-gradient(var(--color-border) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-border) 1px, transparent 1px),
        linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 42%);
      background-size: 120px 120px, 120px 120px, auto;
    }

    canvas {
      display: block;
      width: 100%;
      height: 520px;
      cursor: grab;
    }

    .scene-label {
      position: absolute;
      left: 1rem;
      display: inline-flex;
      min-height: 34px;
      align-items: center;
      border: 1px solid var(--color-border);
      background: var(--color-bg);
      color: var(--color-text);
      padding: 0.35rem 0.65rem;
      font-family: "IBM Plex Mono", monospace;
      font-size: 0.78rem;
      font-weight: 700;
    }

    .scene-label--top {
      top: 1rem;
    }

    .scene-label--bottom {
      bottom: 1rem;
    }

    @media (max-width: 820px) {
      :host,
      .scene-shell {
        min-height: 360px;
      }

      canvas {
        height: 360px;
      }
    }
  `
})
export class HeroSceneComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private animationFrame = 0;
  private resizeObserver?: ResizeObserver;
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private group?: THREE.Group;
  private pointerX = 0;
  private pointerY = 0;
  private readonly reducedMotion =
    isPlatformBrowser(this.platformId) &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.zone.runOutsideAngular(() => this.initScene());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
    this.renderer?.dispose();
    this.scene?.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        const materials: THREE.Material[] = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material: THREE.Material) => material.dispose());
      }
    });
  }

  private initScene(): void {
    const canvas = this.canvas().nativeElement;
    const prefersDark = document.documentElement.classList.contains('dark');

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.camera.position.set(0, 0.35, 7.2);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    const keyLight = new THREE.DirectionalLight(0xffffff, prefersDark ? 2.4 : 2.9);
    keyLight.position.set(3, 5, 4);
    this.scene.add(keyLight);
    this.scene.add(new THREE.AmbientLight(0xffffff, prefersDark ? 1.1 : 1.4));

    this.group = this.createIdentityObject();
    this.scene.add(this.group);

    const grid = new THREE.GridHelper(6.5, 8, 0xff5f1f, prefersDark ? 0x334155 : 0xb7b7b7);
    grid.rotation.x = Math.PI / 2;
    grid.position.z = -1.4;
    this.scene.add(grid);

    canvas.addEventListener('pointermove', (event) => {
      const rect = canvas.getBoundingClientRect();
      this.pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      this.pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    });

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.resize();
    this.renderLoop();
  }

  private createIdentityObject(): THREE.Group {
    const group = new THREE.Group();
    const orange = new THREE.MeshStandardMaterial({
      color: 0xff5f1f,
      roughness: 0.36,
      metalness: 0.12
    });
    const ivory = new THREE.MeshStandardMaterial({
      color: 0xf4f1eb,
      roughness: 0.48,
      metalness: 0.05
    });
    const darkGlass = new THREE.MeshPhysicalMaterial({
      color: 0x171717,
      roughness: 0.2,
      metalness: 0.24,
      transmission: 0.08,
      thickness: 0.35
    });

    const core = new THREE.Mesh(new THREE.BoxGeometry(2.25, 2.25, 1.25, 4, 4, 2), ivory);
    group.add(core);

    const screen = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.35, 0.08), darkGlass);
    screen.position.z = 0.67;
    group.add(screen);

    const frame = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.12, 16, 4), orange);
    frame.scale.set(1, 1, 0.18);
    frame.rotation.z = Math.PI / 4;
    frame.position.z = 0.79;
    group.add(frame);

    const eyeGeometry = new THREE.SphereGeometry(0.12, 24, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.65 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.34, 0.08, 0.75);
    const rightEye = leftEye.clone();
    rightEye.position.x = 0.34;
    group.add(leftEye, rightEye);

    const ring = new THREE.Mesh(new THREE.TorusKnotGeometry(0.42, 0.09, 96, 12), orange);
    ring.position.set(1.45, 0.95, -0.2);
    ring.rotation.set(0.8, 0.2, 0.4);
    group.add(ring);

    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.018, 12, 120), orange);
    orbit.rotation.set(1.1, 0.3, 0.35);
    group.add(orbit);

    group.rotation.set(-0.18, -0.48, 0.06);
    return group;
  }

  private resize(): void {
    if (!this.renderer || !this.camera) {
      return;
    }

    const canvas = this.canvas().nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private renderLoop = (): void => {
    if (!this.renderer || !this.scene || !this.camera || !this.group) {
      return;
    }

    this.group.rotation.y += this.reducedMotion ? 0 : 0.0024;
    this.group.rotation.x += (this.pointerY * 0.18 - this.group.rotation.x) * 0.018;
    this.group.rotation.z += (this.pointerX * 0.12 - this.group.rotation.z) * 0.018;
    this.renderer.render(this.scene, this.camera);

    if (!this.reducedMotion) {
      this.animationFrame = requestAnimationFrame(this.renderLoop);
    }
  };
}
