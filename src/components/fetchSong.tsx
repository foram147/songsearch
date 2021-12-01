import React,{ChangeEvent, useEffect,useState} from "react";
import {Button,Card,Row,Col,Container} from'react-bootstrap'

interface song{
    id:string;
    title:string;
    duration:number;
}
const fetchSong = ()=>{
    const [query, setQuery] = useState('never')
    const [data, setData] = useState<song[]>([]);
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value)
        setQuery(e.target.value)
        console.log(query)
    }
    useEffect(()=>{
        const getsongs = async()=>{
            try{
                let resp = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
                if(resp.ok){
                    let receivedsongs = await resp.json();
                    let songs:song[] = await receivedsongs.data;
                    console.log(songs);
                    setData(songs);
                    console.log(data)
                }
            }catch(error){console.log(error)}
        };
        getsongs();
    },[query]);
    return(
        <>
        <div style={{ marginTop: '20px' }}>
				<input
					type='text'
					placeholder='Search'
					value={query}
					onChange={handleChange}
				/>
			</div>
            <Container className='mt-3'>
				<Row>
					{data?.map((song) => {
						return (
							<Col lg={4} className='mt-3'>
								<Card style={{ width: '18rem', color: 'black' }}>
									<Card.Body>
										<Card.Title>{song.title}</Card.Title>
										<Card.Text>{song.duration}</Card.Text>
										<Button variant='primary'>{song.id}</Button>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
    )
}
export default fetchSong;