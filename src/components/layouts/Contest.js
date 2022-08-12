import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from './logo192.png'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { BsFillBookmarkFill, BsFillBookmarkCheckFill, BsHeartFill, BsHeart } from 'react-icons/bs';
import '../App.css'


const alltags = ['All', 'Trending', 'Latest', 'Design', 'Music'];
const contestlist = [
    ['Mc. Maharaja Mint',
    'Web 3 is taking the world by storm, and we are not taking a back seat! In a first like never before here is a tech contest for the foodies- Food recipes, finesse in plating, top dishes, fast food cooking, whatever fills your palette!- mint an audio, video or image NFT of your favorite foodgasm moment in life and stand a chance to mint the next big category of NFT fame on OpenLake as well as various exciting rewards!',
    5,
    'https://www.graphicdesignforum.com/uploads/default/original/2X/c/cbef8ce030a0cd7feb4f603843dd804a69705c83.jpg'
    ],

    ['Artify',
    'Coloured monkeys and traffic noises being converted to cash is not all that NFTs represent. Step up artists, as it\'s time to show the world what\'s real! Mint the most beautiful true forms of art into NFTs (be it a painting, a choreography, a melody, whatever comes from your heart!), which is to be judged by the world\'s top artists across categories to change the meaning of Non-Fungible into Invaluable...',
    3,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQDZ3ugfcnQ607-CHRcL1M-m3B0ciZn23zNFoP-BlaolD6LoeLRVxJc_ilGBf5-fUdbX4&usqp=CAU'
    ],

    ['Gotham\'s Gala',
    'Who doesn\'t love superheroes- Batman, to daredevil, to ironman; are you a true fan? Enough of decorating apes, show your talent in minting our super heroes into the multiverse of web3! Auction your best Super Hero art, and acquire Bruce Wayne\'s super powers- He\'s rich ;) Also stand a chance to intern at our newly launched Web 3 division to kickstart your careers!',
    2,
    'https://spng.pngfind.com/pngs/s/555-5552511_wayne-logo-fake-movie-company-logos-hd-png.png'
    ]


]
export default function Contest() {
  
  // const [tags, setTags] = useState([]);
  return (
    <div className="App">
    <div className="tags-input-container">
          {alltags.map((item, i) => (
            <div className="tag-item">
            <span className="text" onClick = {(index) => {
              Array.from(document.querySelectorAll(".tag-item"))[i].classList.toggle('selected')
              // setTags(tags.push(i));
            }}>{item}</span>
            {/* <span className="close" onClick={(index) => {
                
            }}>&times;</span> */}
        </div>
          ))}
        </div>
    <Row md={3} className="g-4">
      {contestlist.map((item, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src= {item[3]} />
            <Card.Body>
              <Card.Title>{item[0]}</Card.Title>
              <Card.Text>
                {item[1]}
              </Card.Text>
              <a href = "/create"><Button variant="primary">Submit</Button></a>
              <span style = {{display : 'flex', marginTop : '10px', gap : '150px'}} >
                <p >{item[2]} participants</p>
                <span><BsHeart size={22}></BsHeart>
                <BsFillBookmarkFill size={22}> </BsFillBookmarkFill></span>
                
              </span>
              
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  );
}
