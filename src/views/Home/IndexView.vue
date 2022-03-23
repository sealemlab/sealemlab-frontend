<template>
  <div class="home">
    <div class="home_bgbox">
      <img src="@/assets/images/homebg.png" class="homebg" />
      <div class="content_box display_flex">
        <div class="top_box display_flex">
          <div class="left_box display_flex">
            <div class="token_box display_flex">
              <span class="token_txt">TOKEN</span>
              <img src="@/assets/images/tokenimg.png" class="tokenimg" />
            </div>
            <div class="coin_box display_flex">
              <div class="sr_box display_flex">
                <div class="line_sr display_flex">
                  <img src="@/assets/images/srlogo.png" class="srlogo" />
                  <span class="sr_price">$12.25</span>
                </div>
                <div class="sr_address display_flex">
                  <span class="sr_address_txt">SR: 0x73CA0db...4Ce2854897</span>
                  <img src="@/assets/images/copy.png" class="copy" />
                </div>
              </div>
              <div class="sr_box display_flex">
                <div class="line_sr margin_30 display_flex">
                  <img src="@/assets/images/stlogo.png" class="srlogo" />
                  <span class="sr_price">$12.25</span>
                </div>
                <div class="sr_address margin_30 display_flex">
                  <span class="sr_address_txt">ST: 0x73CA0db...4Ce2854897</span>
                  <img src="@/assets/images/copy.png" class="copy" />
                </div>
              </div>
            </div>
          </div>
          <div class="left_box display_flex">
            <div class="token_box display_flex">
              <span class="token_txt">HOW TO BUY</span>
              <img src="@/assets/images/tobuyimg.png" class="tobuyimg" />
            </div>
            <div class="link_ display_flex">
              <img src="@/assets/images/tel.png" class="link_img" />
              <img src="@/assets/images/git.png" class="link_img" />
              <img src="@/assets/images/game.png" class="link_img" />
              <img src="@/assets/images/m.png" class="link_img last_img" />
            </div>
          </div>
        </div>
        <div class="bottom_box display_flex">
          <div class="btn btn1">
            BUY NFT
          </div>
          <div class="btn btn2">
            PLAY GAME
          </div>
        </div>
      </div>
    </div>
    <div class="character_introduction display_flex">
      <div class="people_box"><img src="@/assets/images/people.png" class="people" /></div>
      <div class="right_box display_flex">
        <span class="title_txt">What is Sacred Realm</span>
        <img src="@/assets/images/people_line.png" class="people_line" />
        <span class="txt_content">《圣域》是一款基于区块链技术的大型多人在线MORPG游戏，游戏采用虚幻4引擎打造，有着超精致的画面表现、动作性以及打击感。
圣域叙述光之英雄与黑暗力量之间的无尽战斗。玩家所扮演的光之英雄挺身而出，直到消灭黑暗之主为止，让久违的和平再度降临圣域！</span>
      </div>
    </div>
    <div class="characteristic_box display_flex">
      <span class="title_txt">特 点</span>
      <img src="@/assets/images/people_line.png" class="people_line" />
      <div class="imgbox display_flex">
        <div class="onebox display_flex" :class="{margin0:index % 4 == 3 }" v-for="(item, index) in spArr" :key="index">
          <img :src="item.src" class="img_sp" />
          <span class="txt">{{item.txt}}</span>
          <span v-if="item.txt1">{{item.txt1}}</span>
        </div>
      </div>
    </div>
    <div class="characteristic_box make_money display_flex">
      <span class="title_txt">在圣域怎样赚钱？</span>
      <img src="@/assets/images/people_line.png" class="people_line" />
      <div class="imgbox display_flex">
        <div class="txtbox display_flex" :class="{margin0:index % 4 == 3 }" v-for="(item, index) in makeMoneyArr" :key="index">{{item.txt}}</div>
      </div>
    </div>
    <div class="characteristic_box make_money_people display_flex">
      <span class="title_txt">游戏人物展示</span>
      <img src="@/assets/images/people_line.png" class="people_line" />
      <div class="show_peoplebox display_flex">
        <div class="left_people display_flex">
          <img src="@/assets/images/people1.png" class="people1" />
          <img src="@/assets/images/people1.png" class="people1" />
          <img src="@/assets/images/people1.png" class="people1" />
          <img src="@/assets/images/people1.png" class="people1" />
          <img src="@/assets/images/people1.png" class="people1" />
          <img src="@/assets/images/people1.png" class="people1" />
        </div>
        <div class="right_maxpeople">
          <img src="@/assets/images/peoplemax.png" class="peoplemax" />
        </div>
      </div>
    </div>
    <div class="characteristic_box make_money_people display_flex">
      <span class="title_txt">游戏场景展示</span>
      <img src="@/assets/images/people_line.png" class="people_line" />
      <div class="game_scene">
        <img src="@/assets/images/gameSceneMax.png" class="gameSceneMax" />
        <div class="position_img display_flex">
          <img src="@/assets/images/gameScene1.png" class="gameScene1" />
          <img src="@/assets/images/gameScene1.png" class="gameScene1" />
          <img src="@/assets/images/gameScene1.png" class="gameScene1" />
          <img src="@/assets/images/gameScene1.png" class="gameScene1" />
          <img src="@/assets/images/gameScene1.png" class="gameScene1" />
          <img src="@/assets/images/gameScene1.png" class="gameScene1" />
        </div>
      </div>
    </div>
    <div class="characteristic_box make_money_people display_flex">
      <span class="title_txt">团 队</span>
      <img src="@/assets/images/people_line.png" class="people_line" />
      <div class="team_box display_flex">
        <div class="oneteam display_flex" :class="{margin0:index % 3 == 2 }" v-for="(item, index) in teamArr" :key="index">
          <img :src="item.src" class="teaming" />
          <span class="span1">{{item.txt}}</span>
          <span class="span2">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      spArr:[
        {
          src:require('@/assets/images/sp1.png'),
          txt:'DEFI+GAMEFI',
          txt1:'双循环模型'
        },
        {
          src:require('@/assets/images/sp2.png'),
          txt:'DEFI+GAMEFI',
        },
        {
          src:require('@/assets/images/sp3.png'),
          txt:'DEFI+GAMEFI',
        },
        {
          src:require('@/assets/images/sp4.png'),
          txt:'DEFI+GAMEFI',
        }
      ],
      teamArr:[
        {
          src:require('@/assets/images/ceo.png'),
          txt:'CEO',
          name:'DomLane'
        },
        {
          src:require('@/assets/images/cmo.png'),
          txt:'CMO',
          name:'Greer Phantomhive'
        },
        {
          src:require('@/assets/images/cto.png'),
          txt:'CTO',
          name:'Kim Talon'
        },
        {
          src:require('@/assets/images/svp.png'),
          txt:'SVP Marketing Strate',
          name:'Amelia Emma'
        },
        {
          src:require('@/assets/images/founder.png'),
          txt:'Co-Founder',
          name:'Tinsley-Hafen'
        },
         {
          src:require('@/assets/images/founder1.png'),
          txt:'Co-Founder',
          name:'Henry Evans'
        }
      ],
      makeMoneyArr:[
        {txt:'定期质押ST享有高APY的SR'},
        {txt:'定期质押ST享有高APY的SR'},
        {txt:'定期质押ST享有高APY的SR'},
        {txt:'定期质押ST享有高APY的SR'},
        {txt:'定期质押ST享有高APY的SR'}
      ]
    }
  }
}
</script>
<style lang="scss" soped>
.home{
  width: 100%;
  margin-top: -96px;
  .home_bgbox{
    width: 100%;
    position: relative;
    .homebg{
      width: 100%;
      object-fit: contain;
    }
    .content_box{
      position: absolute;
      bottom: 6px;
      left: 0;
      width: 100%;
      flex-direction: column;
      padding: 0 49.5px;
      .top_box{
        width: 100%;
        justify-content: space-between;
        .left_box{
          // flex: 1;
          flex-direction: column;
          .token_box{
            width: 100%;
            align-items: center;
            .token_txt{
              font-size: 34px;
              line-height: 37px;
              background: linear-gradient(180deg, #00E6FF 0%, #8847F3 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .tokenimg{
              margin-left: 5px;
              width: 445px;
              object-fit: contain;
            }
            .tobuyimg{
              margin-left: 5px;
              width: 121px;
              object-fit: contain;
            }
          }
          .coin_box{
            width: 100%;
            margin-top: 13px;
            .sr_box{
              flex: 1;
              flex-direction: column;
              .line_sr{
                width: 279px;
                height: 51px;
                align-items: center;
                background-image: url("@/assets/images/coinbg.png");
                background-size: 100% 100%;
                padding: 0 20px;
                .srlogo{
                  width: 29px;
                  object-fit: contain;
                }
                .sr_price{
                  margin-left: 20px;
                }
              }
              .margin_30{
                margin-left: 30px;
              }
              .sr_address{
                width: 100%;
                align-items: center;
                margin-top: 13px;
                .sr_address_txt{
                  margin-right: 5px;
                }
                .copy{
                  width: 13px;
                }
              }
            }
          }
          .link_{
            width: 100%;
            margin-top: 13px;
            align-items: center;
            .link_img{
              width: 67px;
              object-fit: contain;
              margin-right: 30px;
            }
            .last_img{
              margin-right: 0;
            }
          }
        }
      }
      .bottom_box{
        margin-top: 77px;
        width: 100%;
        align-items: center;
        justify-content: center;
        .btn{
          width: 369px;
          height: 101px;
          text-align: center;
          line-height: 101px;
          background-size: 100% 100%;
        }
        .btn1{
          background-image: url("@/assets/images/buynft.png");
        }
        .btn2{
          background-image: url("@/assets/images/playgame.png");
          margin-left: 82px;
        }
      }
    }
  }
  .character_introduction{
    width: 100%;
    justify-content: center;
    .people_box{
      width: 494px;
      .people{
        width: 100%;
        object-fit: contain;
      }
    }
    .right_box{
      width: 700px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title_txt{
        font-size: 50px;
        font-weight: bold;
        color: #00C1FF;
        line-height: 61px;
        text-shadow: 1px 4px 2px #00DFFF, 0px -4px 6px #7756EE;
      }
      .txt_content{
        width: 645px;
        font-size: 14px;
      }
    }
  }
  .characteristic_box{
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 130px;
    .title_txt{
      font-size: 60px;
      // font-family: WenYue-GuDianMingChaoTi-JRFC, WenYue-GuDianMingChaoTi;
      // font-weight: normal;
      color: #00C1FF;
      line-height: 60px;
      text-shadow: 1px 4px 2px #00DFFF, 0px -4px 6px #7756EE;
    }
    .imgbox{
      width: 100%;
      // justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 87px;
      .onebox{
        flex-direction: column;
        align-items: center;
        margin-right: 95px;
        .img_sp{
          width: 238px;
          object-fit: contain;
        }
        .txt{
          margin-top: -80px;
        }
      }
      .txtbox{
        width: 318px;
        height: 52px;
        justify-content: center;
        align-items: center;
        background-image: url("@/assets/images/makemoneybg.png");
        background-size: 100% 100%;
        margin-right: 121px;
        margin-bottom: 83px;
      }
    }
    .show_peoplebox{
      width: 100%;
      justify-content: center;
      .left_people{
        width: 502px;
        align-items: center;
        flex-wrap: wrap;
        .people1{
          width: 237px;
          object-fit: contain;
          margin-right: 14px;
          margin-bottom: 20px;
        }
      }
      .right_maxpeople{
        width: 838px;
        .peoplemax{
          width: 100%;
          object-fit: contain;
        }
      }
    }
    .game_scene{
      width: 100%;
      position: relative;
      .gameSceneMax{
        width: 100%;
        object-fit: contain;
      }
      .position_img{
        width: 714px;
        position: absolute;
        bottom: 31px;
        left: 42px;
        align-items: center;
        flex-wrap: wrap;
        .gameScene1{
          width: 218px;
          margin-right: 19px;
          margin-bottom: 21px;
        }
      }
    }
    .team_box{
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      .oneteam{
        flex-direction: column;
        align-items: center;
        margin-right: 257px;
        margin-bottom: 90px;
        .teaming{
          width: 217px;
          object-fit: contain;
        }
        .span1{
          margin:34px 0 17px;
        }
        .span2{

        }
      }
    }
  }
  .make_money{
    margin-top: 230px;
  }
  .make_money_people{
    margin-top: 137px;
  }
}
.people_line{
  width: 646px;
  object-fit: contain;
  margin: 38px 0;
}
</style>
