import {Character} from "../entities/character";
import {Platform} from "../entities/platform";

export class GameState extends Phaser.State {
  character: Character;

  init () {}
  preload () {}

  create () {
    let banner = this.add.text(0, 0, "Let's make a game!", {});
    banner.font = 'Nunito';
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.anchor.setTo(0, 0);

    let testPlatform = new Platform(this, 100, 100, 100, 50, "ground");
    let mushroom = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "mushroom");
    mushroom.anchor.setTo(0.5, 0.5);
  }

  render () {}
}
