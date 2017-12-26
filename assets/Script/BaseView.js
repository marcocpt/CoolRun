cc.Class({
    extends: cc.Component,

    properties: {
        m_Hero:cc.Animation,
        m_BtRoll: cc.Button,
        m_Back1: [cc.Node],
    }, 

    // use this for initialization
    // 第一次进入，空间创建产生后会调用的函数
    onLoad: function () {
        // cc.log('Hello  World');
        // this.m_Hero = this.m_Hero.getComponent(cc.Animation)
        this.myHeroplay('Run');
        this.m_BtRoll.node.on(cc.Node.EventType.TOUCH_START,this.touchStart, this);
        this.m_BtRoll.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd, this);
        this.m_BtRoll.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd, this);

        var move = cc.moveTo(5, cc.p(-500, 0));
        var seq = cc.sequence(move, cc.callFunc(function() {

        }));
        this.m_Back1[0].runAction(move);
    },

    touchStart: function() {
        cc.log('touchStart');
        if (this.m_Hero.currentClip.name == 'Jump') {
            return;
        }
        this.myHeroplay('Roll');
    },

    touchEnd: function() {
        cc.log('touchEnd');
        if (this.m_Hero.currentClip.name == 'Jump') {
            return;
        }
        this.myHeroplay('Run');
    },

    callBackDownOver: function() {
        cc.log("callBackDownOver");
        // var animation = this.getComponent(cc.Animation);
        this.myHeroplay('Run');
    },

    onAnimationChange: function(target, data) {
        cc.log("onAnimationChange " + data);

        // if (this.m_Hero.currentClip.name == 'Jump') {
        //     return;
        // }

        if (data == 'Jump' && this.isCanChangeClip('Jump')) {
            var moveUp = cc.moveTo(1, -108, 42).easing(cc.easeCubicActionOut());
            var moveDown = cc.moveTo(1, -108, -52).easing(cc.easeCubicActionIn());
            var callBack = cc.callFunc(this.callBackDownOver, this, this);
            var seq = cc.sequence(moveUp, moveDown, callBack);
            this.m_Hero.node.runAction(seq);
            
        }
        this.myHeroplay(data);
    },

    myHeroplay: function(playName) {
        if (this.isCanChangeClip(playName) == false) {
            return;
        }
        if (playName == 'Roll') {
            this.m_Hero.node.setPosition(-108, -59);
        } else if (playName == 'Run') {
            this.m_Hero.node.setPosition(-108, -52);
        }
        this.m_Hero.play(playName);
    },

    isCanChangeClip: function(playName) {
        //判断滑铲
        if( playName == 'Roll')
        {
            //如果是跳跃动画,返回否
            if( this.m_Hero.currentClip.name == 'Jump' )
            {
                return false;
            }
            //如果是跑动,返回可以
            else if( this.m_Hero.currentClip.name == 'Run')
            {
                return true;
            }
        }
        //判断可不可以播放跳跃
        else if( playName == 'Jump')
        {
            //如果是跑动,可以
            if( this.m_Hero.currentClip.name == 'Run')
            {
                return true;
            }
            //其他任何动画播放时,都不可以
            else 
            {
                return false;
            }
        }
        //其他动作都可以
        return true;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
