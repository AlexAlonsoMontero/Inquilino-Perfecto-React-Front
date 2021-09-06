import { assertUserWhitespacable } from "@babel/types";
import { useEffect, useState } from "react";
import { backRoutes } from "../../routes";
import { Rate } from "antd";
const UserReview = ({ id, setShowReview }) => {
    const [reviews, setReviews] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getReviews = async () => {
            setLoading(true);
            const data = await fetch(`${backRoutes.r_reviewByUser}usr_inquilino_uuid=${id}`)
            const results = await data.json()
            setReviews(results.data)
            setLoading(false);

        }

        getReviews()

    }, [id]);
    return (
        loading ? <div>Cargando...</div> : <div>
            <h1>Reseñas</h1>
            {reviews.length > 0 ? reviews.map(rev => {
                return (
                    <>
                        <p>Puntuación: <Rate value={rev.puntuacion} /></p>
                        <p>Observaciones {rev.contenido} </p>
                    </>
                )
            }) : <p>Este inquilino no tiene reviews</p>
            }

            <button onClick={() => setShowReview(false)}>Cerrar</button>
        </div>

    )
}
export default UserReview
