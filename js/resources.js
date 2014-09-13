/* global game */
'use strict';

game.resources = [

	/* Graphics.
	 * @example
	 * {name: 'example', type:'image', src: 'data/img/example.png'},
	 */
	 // tilesets
	{name: 'smb_1-1', type:'image', src: 'data/img/map/smb_1-1.png'},
	{name: 'smb_1-1_level_tiles', type:'image', src: 'data/img/map/smb_1-1_level_tiles.png'},

	// metatiles
	{name: 'metatiles16x16', type:'image', src: 'data/img/map/metatiles16x16.png'},

	// sprites
	{name: 'bmo', type:'image', src: 'data/img/sprite/bmo.png'},
	{name: 'smb_coin', type:'image', src: 'data/img/sprite/smb_coin.png'},

	// fonts
	{name: '16x16_font', type:'image', src: 'data/img/font/16x16_font.png'},


	/* Atlases
	 * @example
	 * {name: 'example_tps', type: 'tps', src: 'data/img/example_tps.json'},
	 */

	/* Maps.
	 * @example
	 * {name: 'example01', type: 'tmx', src: 'data/map/example01.tmx'},
	 * {name: 'example01', type: 'tmx', src: 'data/map/example01.json'},
	 */
	// {name: 'area01', type: 'tmx', src: 'data/map/area01.tmx'},
	{name: 'smb_1-1', type: 'tmx', src: 'data/map/smb_1-1.tmx'},

	/* Background music.
	 * @example
	 * {name: 'example_bgm', type: 'audio', src: 'data/bgm/'},
	 */

	/* Sound effects.
	 * @example
	 * {name: 'example_sfx', type: 'audio', src: 'data/sfx/'}
	 */
	// {name: 'cling', type: 'audio', src: 'data/sfx/'},
	// {name: 'stomp', type: 'audio', src: 'data/sfx/'},
	{name: 'jump',  type: 'audio', src: 'data/sfx/'},
];
