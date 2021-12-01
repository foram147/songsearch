import React,{ChangeEvent, useEffect,useState} from "react";
import {Button,Card,Row,Col,Container} from'react-bootstrap'
import {Song} from '../interfaces/songs'

interface FetchSong{
    song: Song;
}
/*interface song{
    id:string;
    title:string;
    duration:number;
}*/
const FetchSong = ()=>{
    const [query, setQuery] = useState('')
    const [data, setData] = useState<Song[]>([]);
    /*const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value)
        setQuery(e.target.value)
        console.log(query)
    }*/
    useEffect(()=>{
        const getsongs = async()=>{
            try{
                let resp = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
                if(resp.ok){
                    let receivedsongs = await resp.json();
                    let fetchedsongs:Song[] = await receivedsongs.data;
                    console.log(fetchedsongs);
                    setData(fetchedsongs);
                    console.log(data)
                }
            }catch(error){console.log(error)}
        };
        getsongs();
    },[query]);
    return(
        <>
        <div >
				<input
					type='text'
					placeholder='Search'
					value={query}
					onChange={(e)=>{setQuery(e.target.value)}}
				/>
			</div>
            <Container className='mt-3'>
				<Row>
					{data?.map((song) => {
						return (
							<Col lg={3} className='mt-3'>
								<Card style={{ width: '15rem', color: 'black' }}>
                                <Card.Img variant="top" src={song.album.cover} />
									<Card.Body>
										<Card.Title>{song.title}</Card.Title>
										<Card.Text>
                                            <div>
                                                {Math.floor(song.duration/60) + ":" + ("0"+(song.duration%60))}</div></Card.Text>
										<Card.Text >{song.artist.name}</Card.Text>
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
export default FetchSong;