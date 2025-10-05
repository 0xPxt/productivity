/**
 * White Noise Generator using HTML5 Audio
 * Plays high-quality pre-recorded ambient noise files
 */

export type NoiseType = 'white-1' | 'white-2' | 'brown-1' | 'brown-2' | 'pink-1' | 'pink-2';

export class WhiteNoiseGenerator {
  private audio: HTMLAudioElement | null = null;
  private currentNoiseType: NoiseType = 'white-1';

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.loop = true;
    }
  }

  private getAudioPath(noiseType: NoiseType): string {
    const pathMap: Record<NoiseType, string> = {
      'white-1': '/audio/White_noise_1.mp3',
      'white-2': '/audio/White_noise_2.mp3',
      'brown-1': '/audio/Brown_noise_1.mp3',
      'brown-2': '/audio/Brown_noise_2.mp3',
      'pink-1': '/audio/Pink_noise_1.mp3',
      'pink-2': '/audio/Pink_noise_2.mp3',
    };
    return pathMap[noiseType];
  }

  setNoiseType(noiseType: NoiseType) {
    if (!this.audio) return;

    const wasPlaying = !this.audio.paused;
    this.currentNoiseType = noiseType;
    this.audio.src = this.getAudioPath(noiseType);

    if (wasPlaying) {
      this.audio.play();
    }
  }

  play() {
    if (!this.audio) return;

    // Load audio if not already loaded
    if (!this.audio.src) {
      this.audio.src = this.getAudioPath(this.currentNoiseType);
    }

    this.audio.play();
  }

  stop() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  setVolume(volume: number) {
    if (!this.audio) return;
    // Volume is 0-100, convert to 0-1
    this.audio.volume = Math.min(volume / 100, 1);
  }

  getIsPlaying(): boolean {
    return this.audio ? !this.audio.paused : false;
  }

  dispose() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
  }
}
