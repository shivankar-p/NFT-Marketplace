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
    ['Card title',
    'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    2,
    'https://www.graphicdesignforum.com/uploads/default/original/2X/c/cbef8ce030a0cd7feb4f603843dd804a69705c83.jpg'
    ],

    ['Card title',
    'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    0,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQDZ3ugfcnQ607-CHRcL1M-m3B0ciZn23zNFoP-BlaolD6LoeLRVxJc_ilGBf5-fUdbX4&usqp=CAU'
    ],

    ['Card title',
    'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    0,
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
