import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from './logo192.png'
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { BsFillBookmarkFill, BsFillBookmarkCheckFill, BsHeartFill, BsHeart } from 'react-icons/bs';
import '../App.css'


const alltags = ['All', 'Trending', 'Latest', 'Design', 'Music'];
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
      {Array.from({ length: 6 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src= {logo} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Button variant="primary">Submit</Button>
              <span style = {{display : 'flex', marginTop : '10px', gap : '150px'}} >
                <p >568 participants</p>
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
