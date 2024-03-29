/* global game, me */
'use strict';

/*-------------------
a player entity
-------------------------------- */
game.PlayerEntity = me.Entity.extend({

	init: function(x, y, settings) {
		settings.image = 'bmo';

		settings.width = 16;
		settings.spritewidth = settings.height = 32;
		settings.spriteheight = settings.height = 32;

		// call the constructor
		this._super(me.Entity, 'init', [x, y, settings]);

		// set the default horizontal & vertical speed (accel vector)
		this.body.setVelocity(3, 15);

		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		// ensure the player is updated even when outside of the viewport
		this.alwaysUpdate = true;
	},

	update: function(dt) {

		if (me.input.isKeyPressed('left')) {
			// flip the sprite on horizontal axis
			this.flipX(true);
			// update the entity velocity
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
		} else if (me.input.isKeyPressed('right')) {
			// unflip the sprite
			this.flipX(false);
			// update the entity velocity
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		} else {
			this.body.vel.x = 0;
		}

		if (me.input.isKeyPressed('jump')) {
			// make sure we are not already jumping or falling
			if (!this.body.jumping && !this.body.falling) {
				// set current vel to the maximum defined value
				// gravity will then do the rest
				this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
				// set the jumping flag
				this.body.jumping = true;
				// play some audio
				me.audio.play('jump');
			}

		}

		// check & update player movement
		this.body.update(dt);

		// check for collision with sthg
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		// update animation if necessary
		if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
			// update object animation
			this._super(me.Entity, 'update', [dt]);
			return true;
		}

		// else inform the engine we did not perform
		// any update (e.g. position, animation)
		return false;
	},

	/**
	 * colision handler
	 */
	collideHandler: function (response) {
		if (response.b.body.collisionType === me.collision.types.ENEMY_OBJECT) {
			if ((response.overlapV.y > 0) && !this.body.jumping) {
				// bounce (force jump)
				this.body.falling = false;
				this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
				// set the jumping flag
				this.body.jumping = true;
				// play some audio
				me.audio.play('stomp');
			} else {
				// let's flicker in case we touched an enemy
				if (!this.renderable.isFlickering()) {
					game.data.score -= 250;
					this.renderable.flicker(750);
					// play some audio
					me.audio.play('stomp');
				}
			}
		}
	}
});

game.CoinEntity = me.CollectableEntity.extend({
	// extending the init function is not mandatory
	// unless you need to add some extra initialization
	init: function(x, y, settings) {

		settings.image = 'smb_coin';
		settings.spritewidth = settings.width = 16;
		settings.spriteheight = settings.height = 16;

		// call the parent constructor
		this._super(me.CollectableEntity, 'init', [x, y , settings]);

		this.renderable.addAnimation('loop', [0,1,2], 300);
		this.renderable.setCurrentAnimation('loop');

		// set our collision callback function
		this.body.onCollision = this.onCollision.bind(this);
	},

	// this function is called by the engine, when
	// an object is touched by something (here collected)
	onCollision: function() {
		// do something when collected

		// give some score
		game.data.score += 250;

		// make sure it cannot be collected 'again'
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);

		// remove it
		me.game.world.removeChild(this);
	}
});
