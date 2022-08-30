import { Button, Card, Stack } from "react-bootstrap";
import { ChevronRight, FileMusic, Film, Image } from "react-bootstrap-icons";
import { Link } from "react-router-dom";


function RecompensaCard(props) {
    const recompensa = props.recompensa;

    return (
        <Link to={'/recompensa/' + recompensa.uuid_recompensa} style={{ textDecoration: 'none', color: 'black' }}>
            <Card className='mt-0 mb-0' key={recompensa.uuid_recompensa} >
                <Stack className='' direction="horizontal">
                    {recompensa.tipo === 'Audio' &&
                        <FileMusic size={40} width={50} />
                    }
                    {recompensa.tipo === 'Video' &&
                        <Film size={40} width={50} />
                    }
                    {recompensa.tipo === 'Foto' &&
                        <Image size={40} width={50} />
                    }
                    <p className='m-3 mt-0 mb-0'>{recompensa.titulo}</p>
                    <Button className="ms-auto" variant='light'><ChevronRight /></Button>
                </Stack>
            </Card>
        </Link>
    )
}

export default RecompensaCard;