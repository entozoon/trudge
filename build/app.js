'use strict';var game,graphics,creatures=[],physicalGroup;window.onload=function(){game=new Phaser.Game({width:200,height:200,antialias:!1,renderer:Phaser.CANVAS,state:{preload:preload,create:create,update:update,render:render}})};var preload=function(){game.load.image('heroSprite','sprites/hero.png'),game.load.image('creatureSprite','sprites/creature.png')},create=function(){game.scale.scaleMode=Phaser.ScaleManager.RESIZE,game.scale.parentIsWindow=!0,graphics=game.add.graphics(0,0),physicalGroup=game.add.group(),physicalGroup.enableBody=!0,physicalGroup.physicsBodyType=Phaser.Physics.ARCADE,creatures.push(new Creature({x:100,y:100,velocity:{x:100,y:20}})),creatures.push(new Creature({x:200,y:100,velocity:{x:0,y:0}})),creatures.push(new Creature({x:300,y:100,velocity:{x:0,y:0}})),creatures.push(new Creature({x:400,y:100,velocity:{x:-100,y:10}}));var a=new Creature({sprite:game.add.sprite(41,42,'heroSprite'),x:500,y:100});creatures.push(a)},update=function(){creatures.forEach(function(a){a.update()})},render=function(){graphics.clear(),graphics.beginFill(15658734,1),graphics.drawRect(0,0,game.width,game.height),graphics.endFill(),creatures.forEach(function(a){a.render()})};
'use strict';var _createClass=function(){function c(d,e){for(var g,f=0;f<e.length;f++)g=e[f],g.enumerable=g.enumerable||!1,g.configurable=!0,'value'in g&&(g.writable=!0),Object.defineProperty(d,g.key,g)}return function(d,e,f){return e&&c(d.prototype,e),f&&c(d,f),d}}();function _classCallCheck(c,d){if(!(c instanceof d))throw new TypeError('Cannot call a class as a function')}var Creature=function(){function c(d){_classCallCheck(this,c),d=d?d:{},this.sprite=d.sprite?d.sprite:game.add.sprite(41,42,'creatureSprite'),game.physics.arcade.enableBody(this.sprite),physicalGroup.add(this.sprite),this.id=creatures.length,game.physics.arcade.enableBody(this.sprite),this.sprite.body.setSize(24,26,11,7),this.sprite.body.immovable=!1,this.sprite.x=d.x?d.x:99,this.sprite.y=d.y?d.y:99,this.sprite.body.velocity=d.velocity?d.velocity:{x:0,y:0},this.sprite.mother=this,this.sprite.setHealth(100),game.input.onDown.add(function(){console.log('input captured')})}return _createClass(c,[{key:'getSprite',value:function getSprite(){return this.sprite}},{key:'processCallback',value:function processCallback(){return!0}},{key:'destroy',value:function destroy(){var d=this;physicalGroup.remove(this.sprite,!0),creatures=creatures.filter(function(e){return e.id==d.id})}},{key:'wasTouched',value:function wasTouched(){if(this.sprite.damage(50),console.log('HP: '+this.sprite.health),0>=this.sprite.health)return void(this.dying=!0)}},{key:'collideCallback',value:function collideCallback(d,e){d.mother&&d.mother.wasTouched(),e.mother&&e.mother.wasTouched()}},{key:'update',value:function update(){this.dying&&this.destroy(),game.physics.arcade.collide(this.sprite,physicalGroup,this.collideCallback,this.processCallback,this)}},{key:'render',value:function render(){game.debug.body(this.sprite)}}]),c}();
