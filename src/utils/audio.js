// Simple synthesizer for a wood/plastic "clack" sound
export const playBeadSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    // Create context on the fly or reuse (browser policy requires interaction first)
    // For simplicity, we create one per click or preferably reuse a global one if we could, 
    // but a new one per event is safer for "lazy" init rules.
    const ctx = new AudioContext();

    const t = ctx.currentTime;

    // 1. Impact noise (the "click")
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Shaping the tone to sound like wood/plastic
    // A quick burst of triangle or sine wave with rapid decay
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.1); // Pitch drop

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.1);

    // 2. High frequency "snap" (optional, for crispness)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();

    snapOsc.type = 'square';
    snapOsc.frequency.setValueAtTime(2000, t);
    snapOsc.frequency.exponentialRampToValueAtTime(500, t + 0.05);

    snapGain.gain.setValueAtTime(0.1, t);
    snapGain.gain.linearRampToValueAtTime(0, t + 0.05); // Very short

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);

    snapOsc.start(t);
    snapOsc.stop(t + 0.05);
};
