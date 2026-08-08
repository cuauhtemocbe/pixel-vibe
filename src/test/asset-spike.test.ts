import { describe, expect, it, vi } from "vitest";
import AssetSpike from "../scenes/AssetSpike";

describe("Asset spike preview", () => {
  it("starts gameplay from the isolated preview", () => {
    const spike = Object.create(AssetSpike.prototype) as any;
    spike.scene = { start: vi.fn() };

    spike.startGame();

    expect(spike.scene.start).toHaveBeenCalledWith("Play");
  });
});
