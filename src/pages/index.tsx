import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import _ from 'lodash';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {

  //list of possible cards to populate the screen with
  const listOfBaseCards: Array<string> = _.shuffle(
    [
      "/images/54de566dd97bdfae3fb0564e81572f5b.jpg",
      "/images/619fe9b796217efb089b50e2475eed0f.jpg",
      "/images/0428127736a0dea95c365e6184ecac7b.jpg",
      "/images/50603917776112bde06137fbfd8744c7.jpg",
      "/images/f1cb4c69f71408206e172a99e0f2bb4b.jpg",
      "/images/fc6e47483ca93c1060e74a45e4c370fb.jpg"
    ]
  ).slice(0, 5)

  const backside = "/images/0103a18cef9961b6e3f2dab5e5aa308d.jpg"

  var listofgeneratedcards: Array<string> = _.shuffle(_.concat(listOfBaseCards, ...listOfBaseCards))

  console.log('listofgeneratedcards', listofgeneratedcards)


  //initalize the cards that can be changed parameters
  const initcards = listofgeneratedcards.map((eachCard: string, id: number) => {
    return {
      'url': eachCard,
      "id": id,
      'isflipped': false,
      "won": false
    }

  })

  const [cards, setCards] = React.useState(initcards);

  function flipCard(urltoflip: any) {

    console.log('flip!')
    //setCards to cards but the cards that was clicked should be flipped

    var desiredResult: Array<any> = (cards.map((eachCard: any) => {

      if (eachCard.id === urltoflip) {
        return {
          ...eachCard,
          isflipped: !eachCard.isflipped
        }
      } else {
        return eachCard
      }

    }))

    var numberOfCardsFlippedPerUrl: any = {}




    //is it a won card checker 
    var wonurl = ""

    var wonurls: Array<string> = []


    desiredResult.forEach((eachCard: any) => {
      // add 1 to numberOfCardsFlippedPerUrl[eachCard.url] if it exists

      if (eachCard.isflipped) {
        if (numberOfCardsFlippedPerUrl[eachCard.url]) {
          numberOfCardsFlippedPerUrl[eachCard.url] = numberOfCardsFlippedPerUrl[eachCard.url] + 1
          wonurl = eachCard.url;
          wonurls.push(eachCard.url)
        }
        else {
          numberOfCardsFlippedPerUrl[eachCard.url] = 1
        }
      }

    })

    console.log('numberOfCardsFlippedPerUrl', numberOfCardsFlippedPerUrl)

    desiredResult = desiredResult.map((eachCard: any) => {
      if (eachCard.url == wonurl || wonurls.includes(eachCard.url)) {
        return {
          ...eachCard,
          won: true
        }
      } else {
        return eachCard
      }
    });

    console.log('desired result', desiredResult)

    setCards(desiredResult)

  }



  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        { /*  create 10 cards on grid on screen using tailwind*/}

        {/*If all cards are won, then say I won */}
        {cards.filter((eachCard: any) => eachCard.won === false).length === 0 && (
          <>
            <h1>You won!</h1><br></br></>
        )}
        <div className="flex flex-row flex-wrap  gap-x-5 gap-y-4">



          {cards.map((eachCard: any, index: number) => {
            return (
              <div className="" key={index}
              >
                {
                  eachCard.won ? (
                    <div className="w-40 h-[280px] bg-green-200 border-green-500 border-2 w-40">
                      <div className='my-auto text-2xl'>
                        🎉
                      </div>
                    </div>
                  ) : (
                    <img src={eachCard.isflipped === true ? eachCard.url : backside} className=" w-40"

                      onClick={(event: any) => flipCard(eachCard.id)}
                    />
                  )
                }
              </div>
            )
          })}
        </div>


      </main>
    </Layout>
  );
}
