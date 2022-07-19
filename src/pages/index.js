import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@components/Button'
import { getAccount } from '@selectors/user.selectors'
import { getChainId } from '@selectors/global.selectors'
import {
  openCryptoOptionsModal,
  openSwitchNetworkModal
} from '@actions/modals.actions'

import userActions from '@actions/user.actions'

import {
  POLYGON_CHAINID,
  WALLET_METAMASK
} from '@constants/global.constants'

function Landing(props) {
  const account = useSelector(getAccount)
  const chainId = useSelector(getChainId)
  const dispatch = useDispatch()
   
  const handleConnectClick = (source) => {
    dispatch(userActions.tryToConnect(source))
  }

  const findPos = obj => {
    var curtop = 0
    if (obj.offsetParent) {
      do {
          curtop += obj.offsetTop;
      } while (obj = obj.offsetParent)
      return [curtop]
    }
  }

  const goDownToMintSection = () => {
    window.scrollBy({
      top: findPos(document.getElementById("mint-section")),
      behavior: 'smooth'
    })
  }

  const onClickCollectButton = () => {
    if (!account) {
      handleConnectClick(WALLET_METAMASK)
    } else {
      if (chainId != POLYGON_CHAINID) {
        dispatch(openSwitchNetworkModal())
      } else {
        dispatch(openCryptoOptionsModal())  
      }
    }
  }


  return (
    <div className='bg-black min-h-screen flex flex-col items-center'>
      <section className='w-full flex justify-between items-center'>
        <div className='mt-3 md:mt-0 p-2 md:p-5 flex flex-row items-center justify-center'>
          <div className='py-2 text-md md:text-2xl lg:text-4xl border-t-2'>
            instructables mint — live now
          </div>
          <a onClick={() => goDownToMintSection()} className='w-6 h-6 md:w-8 md:h-8 ml-3 animButton cursor-pointer'>
            <img src='/images/homepage/arrow.png' className='w-6 h-6 md:w-8 md:h-8'/>
          </a>
        </div>
        <div className='p-2 md:p-5'>
          {
            !account && <Button className='text-lg md:text-2xl lg:text-4xl' onClick={() => handleConnectClick(WALLET_METAMASK)}>
              connect
            </Button>
          }
          {
            account && <div className='text-lg md:text-2xl lg:text-4xl'>
              {
                account.substring(0, 6) + '...' + account.substring(account.length - 4, account.length)
              }
            </div>
          }
        </div>
      </section>

      <section className='text-center w-full py-40 text-3xl md:text-4xl lg:text-60px'>
        in the nounish verse <br />
        you are free to build <br />
        your own name & game... <br />
      </section>

      <img className='mt-0 md:mt-40 px-0 md:px-8' src='/images/homepage/renounables.png' />
      <img className='w-1/2 md:w-2/6 my-48 px-8 object-contain' src='/images/homepage/renoun1.png' />

      <section className='flex flex-row w-full justify-center mt-20 md:mt-80 flex-wrap'>
        <img className='w-1/3 md:w-1/6 mx-4 px-1 md:px-4 object-contain' src='/images/homepage/renoun2.png' />
        <img className='w-1/3 md:w-1/6 mx-4 px-1 md:px-4 object-contain' src='/images/homepage/renoun3.png' />
        <img className='w-1/3 md:w-1/6 mx-4 px-1 md:px-4 object-contain' src='/images/homepage/renoun4.png' />
        <img className='w-1/3 md:w-1/6 mx-4 px-1 md:px-4 object-contain' src='/images/homepage/renoun5.png' />
      </section>

      <section className='flex flex-row w-3/5 justify-center my-10 md:my-20 text-center text-lg md:text-2xl lg:text-3xl'>
        With a taste for nounish culture, a calling to adventure, and precocious social mobility… feed them well so these rare virtual companions can continue to grow with time.  
        <br /><br />
        Take good care of your Renounables. 
        <br /><br />
        Who knows what magical places they will unlock for you. 
      </section>
      
      <section className='flex flex-col md:flex-row my-20 md:my-80'>
        <div className='w-full md:w-1/2 px-5 md:pl-24 md:px-0 lg:pl-32 grid grid-cols-3 gap-10 h-fit'>
        {
          Array.from({length: 9}).fill().map((item, index) => {
            if (index === 8) {
              return (
                <div key={index} className='flex flex-row justify-between px-3 items-center'>
                  <img className='w-1/6 h-fit object-contain' src={`/images/homepage/nouncearts/asterisk.png`} />
                  <img className='w-1/6 h-fit object-contain' src={`/images/homepage/nouncearts/asterisk.png`} />
                  <img className='w-1/6 h-fit object-contain' src={`/images/homepage/nouncearts/asterisk.png`} />
                </div>
              )
            }
            return (
              <img key={index} src={`/images/homepage/nouncearts/art${index + 1}.png`} />
            )
          })
        }
        </div>
        <div className='w-full md:w-1/2 flex flex-col px-6 md:px-12 lg:px-24 mt-10 md:mt-0'>
          <h1 className='text-xl md:text-3xl lg:text-5xl'>
            WHY NOUNISH?
          </h1>
          <div className='mt-4 text-lg md:text-xl lg:text-2xl'>
            An open standard backed by an on-chain commitment&nbsp;
            <span className='font-extralight'>
              to the proliferation of open technoogy, money, and culture attracts curious and quirky creative communities… human & virtual alike.
            </span>
          </div>
          <div className='mt-4 text-lg md:text-xl lg:text-2xl'>
            We recognize ourselves&nbsp;
            <span className='font-extralight'>
              in the invitation to create & the freedom to build.
            </span>
          </div>
          
          <h1 className='text-xl md:text-3xl lg:text-5xl mt-16'>
            WHAT DOES HOLDING NOUNISH <br />
            COMMUNITY AVATARS DO FOR YOUR <br />
            RENOUNABLES?
          </h1>
          <div className='mt-4 text-lg md:text-xl lg:text-2xl font-extralight'>
            A certain sense of pride & admiration may naturally develop. This is normal, no need to be alarmed.
            <br /><br />
            When renounable companions and nounish avatars live together at the same address — even if their primary residence is split across Polygon & Ethereum  — they enjoy longer, happier, more vigorous virtual lives.
            <br /><br />
            The reference module runs its checks. Vitality counters go up at a steady rate. Time countdowns slow down. And, you have more time to feed them the attention & nourishment that makes them go wild.
          </div>
        </div>
      </section>

      <section className='mt-0 md:mt-80 pt-20 w-full flex flex-col items-center' id='mint-section'>
        <div className='w-1/3 bg-gray-400 h-50'>
          <img src='/images/homepage/pack.gif' />
        </div>
        <div className='w-300px lg:w-700px text-xl md:text-3xl lg:text-60px text-center mt-20'>
          DO YOU REALLY NEED TO READ THE INSTRUCTION MANUAL?
        </div>
        <div className='w-300px lg:w-700px text-xl md:text-3xl lg:text-4xl text-center mt-16'>
          A simple collection of words and images shouldn’t be able to do so much
        </div>
        <div className='w-300px lg:w-700px text-lg md:text-xl lg:text-3xl text-center mt-16 font-extralight'>
          With instructables in hand you can show something something, grow something something, speed up something something and use? And with every instructable minted a pixel-region is unlocked on the next microfactory build map
        </div>
        <div className='flex flex-col md:flex-row items-center justify-between my-24 flex-wrap px-5 md:px-0 '>
          <div className='hashtag text-2xl md:text-2.8vw'>#howtonoun</div>
          <div className='hashtag text-2xl md:text-2.8vw'>#freetobuild</div>
          <div className='hashtag text-2xl md:text-2.8vw'>#cc0streetwear</div>
          <div className='hashtag text-2xl md:text-2.8vw'>#microfactory</div>
          <div className='hashtag text-2xl md:text-2.8vw'>#seizethememes</div>
        </div>
      </section>

      <section className='flex flex-col md:flex-row px-10 md:px-12 lg:px-44 xl:px-52 overflow-visible'>
        <div className='w-full md:w-5/12 md:pr-10 overflow-visible'>
          <div className='mb-10 itemwith-sign'>
            5 mini collections of instructables packs
          </div>
          <div className='mb-10 itemwith-sign'>
            which packs you collect is randomly determined from remaining selection at time of mint
          </div>
          <div className='mb-10 itemwith-sign'>
            inaugural run is limited to 500 max packs minted
          </div>
          <div className='mb-10 itemwith-sign'>
            each pack includes:

            <div className='mt-10 flex flex-row flex-wrap'>
              <div className='w-1/2 mb-3 pr-1'>1x digital instructable NFT</div>
              <div className='w-1/2 mb-3 pr-1'>10x vinyl stickers</div>
              <div className='w-1/2 mb-3 pr-3'>1x organic shirt</div>
              <div className='w-1/2 mb-3 pr-3'>1x large print poster</div>
              <div className='w-1/2 mb-3 pr-3'>1x organic hoodie</div>
              <div className='w-1/2 mb-3 pr-3'>3x mini print posters</div>
            </div>
          </div>
        </div>
        <div className='w-full md:w-7/12 text-center font-extralight text-lg md:text-xl lg:text-3xl '>
          <div className='mb-10'>
            All code & artwork is in the public domain.  
          </div>
          <div className='mb-10'>
            Each instructable pack is a mini-collection of print, apparel and digital NFT materials.
          </div>
          <div className='mb-10'>
            100% of instructables proceeds sustain production, fulfillment & advance the build of renounables, for gamelike nounish proliferation.
          </div>
          <div className='mb-10'>
            100% of fabrics used in apparel are organic.
          </div>
          <div className='mb-10'>
            All nounish proliferators are automatically eligible to receive ⌐◨-◨ feed. Bring joy & sustenance to your renounable companions, simply by collecting instructables.
          </div>
        </div>
      </section>

      <section className='flex flex-col justify-center mb-20 md:mb-80'>
        <div className='w-300px lg:w-700px text-xl md:text-3xl lg:text-4xl text-center mt-16'>
          The next instructable pack is ready to mint.
        </div>
        <div className='w-300px lg:w-700px text-xl md:text-3xl lg:text-4xl text-center mt-8 font-extralight'>
          0.5 ETH
        </div>
        <div className='mt-8 text-center'>
          <Button className='text-lg md:text-2xl lg:text-4xl' onClick={() => onClickCollectButton()}>
            collect
          </Button>
        </div>
      </section>

      <section className='my-20 md:my-80 flex flex-col md:flex-row pl-8 md:pl-24 lg:pl-36 xl:pl-42 pr-8 md:pr-0'>
        <div className='w-full md:w-4/12'>
          <img src='/images/homepage/nounces.png' />
        </div>
        <div className='px-2 md:px-20 w-full md:w-8/12'>
          <h1 className='text-xl mt-10 md:mt-0 md:text-3xl lg:text-60px text-center '>
            HOW WELL YOU CARE <br />
            FOR YOUR COMPANIONS <br />
            SHOWS IN THE LIL’ DETAILS <br />
            TOO RARE TO MISS
          </h1>
          <div className='mt-10 font-extralight text-lg md:text-xl lg:text-3xl text-center md:text-center'>
            Like most people, renounables like good company, frequent time to play or explore, and care a lot about what you ⌐◨-◨ feed them.
          </div>
        </div>
      </section>

      <section className='my-20 md:my-80 flex flex-col md:flex-row px-10 md:px-12 lg:px-24 xl:px-42'>
        <div className='px-10 border mx-0 md:mx-4 py-10 w-full md:w-1/2 h-fit'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl text-center'>
            The perks of frequent & playful interaction with your companions, from consistent feeding schedules to casual talks & the occasional random walk, are plentiful.
          </h1>
          <div className='text-lg md:text-xl lg:text-2xl mt-5 text-center font-extralight'>
            Sustain high levels of vitality & healthy growth of essential stats to unlock speciality memberships for virtual & IRL microfactory co-ops. These are magical places dedicated to creative coordination & seizing the memes of nounish production.
          </div>
          <div className='w-full text-center flex justify-center'>
            <img src='/images/homepage/room.png' />
          </div>
        </div>

        <div className='mx-0 md:mx-4 mt-20 md:mt-0 px-10 border py-10  w-full md:w-1/2'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl text-center'>
            As you might have already guessed, neglecting your virtual companion can have dire consequeces… similar to the occacional relationship IRL.
          </h1>
          <div className='text-lg md:text-xl lg:text-2xl mt-5 text-center font-extralight'>
            The speed with which the situation for a nearly forgotten flame goes from alarming, to critical, to virtually hopeless can be stunning. Yet, all hope is not lost.
            <br /><br />
            Good game balance calls sometimes for the carrot, and others for the stick. When renounables are left to cycle helplessly from starvation and negligence to deep hibernation and back again, neverendingly, it becomes time for a bit of both.
            <br /><br />
            For nounish collectors and instructables proliferators inclined to sweep in to the rescue of companions whose vitality & stats hover ever closer to 0, active bids are displayed in a dedicated rescue dashboard currentlly being built.
            <br /><br />
            And for those who have forgotten to bring home enough ⌐◨-◨ feed to share a few too many times, stay near the top of the negligence charts long enough and you might win entry to the the record halls of shame. 
            <br /><br />
            Funny thing about composability, reputation, and long memory…
          </div>
        </div>
      </section>

      <img className='mt-40 px-0 md:px-8' src='/images/homepage/renounables.png' />

      <section className='text-center md:text-3xl lg:text-4xl my-40'>
        no discord or telegram. no one from the team <br />
        will contact you asking for private keys <br />
        etc. don’t believe the scammers. <br />
        it’s a dark forest out there. <br />
        stay vigilant & curious.
      </section>

      <section className='flex flex-row justify-between w-full p-3 md:p-5'>
        <a className='animButton cursor-pointer'>
          <img className='w-6 h-6 md:w-12 md:h-12' src='/images/homepage/footer/twitter.png' href="https://twitter.com/renounables" target="_blank" rel="noreferrer"/>
        </a>
        <img className='w-12 md:w-24 object-contain' src='/images/homepage/footer/red-nounce.png' />
        <img className='w-6 h-6 md:w-12 md:h-12' src='/images/homepage/footer/zero.png' />
      </section>
    </div>
      
  )
}

export default Landing
