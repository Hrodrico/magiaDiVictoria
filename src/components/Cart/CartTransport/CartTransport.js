import React, { useState, useContext } from "react";
import { Divider, Form, Button, Header, Icon } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import { CartContext } from 'context/CartContext';
import { useFormik } from "formik";
import * as Yup from "yup";

//Firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebase/FirebaseConfig"

function CartTransport() {
    const objClient = { name: '', lastName: '', email: '', repeatEmail: '', address: '', phone: '', termsOfService: false };
    const { itemCard, itemClear, stepUpdate } = useContext(CartContext);
    // const [buyId, setBuyId] = useState('');
    const [buyedProducts, setBuyedProducts] = useState({...itemCard});

    const Formik = useFormik({
        initialValues: objClient,
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            lastName: Yup.string().min(2, 'El apellido no es válido, es pequeño.').max(70, 'El apellido no es válido, es largo.').required("El apellido es obligatorio"),
            // phone: Yup.string().min(8, 'El teléfono no es válido, mínimo 8 digitos').max(15, 'El teléfono no es válido, máximo 15').required("El teléfono es obligatorio"),
            email: Yup.string().email("No es un e-mail valido").required("El e-mail es obligatorio"),
            repeatEmail: Yup.string().email("No es un e-mail valido").required("El reingreso e-mail es obligatorio").oneOf([Yup.ref("email")],"E-mail no son iguales "),
            address: Yup.string().required("La dirección es obligatorio"),
            // termsOfService: Yup.boolean().required("Para continuar debe aceptar los terminos y condiciones").oneOf([true], "Deben aceptarse los términos y condiciones.")
        }),
        onSubmit:(formData)=>{
            console.log("formData::",formData);
            getStepOrderPay(formData);
        }
    });
    
    /* Price total of Carro */
    const priceTotal =  itemCard.reduce((totalCart, item) => totalCart + (item.price * item.quantity), 0);

    const getStepReviewOrder = () => {
        stepUpdate(1);
    }
    
    const getStepOrderPay = async (informationClient) => {
        stepUpdate(3);
        const saleDate = new Date().toLocaleDateString();
        const refPurchaseOrder = collection(db, "purchaseOrder");
        const docRef = await addDoc(refPurchaseOrder, {informationClient, buyedProducts, priceTotal, saleDate})
        // setBuyId(docRef)
        // console.log("docRef::",docRef.id );
        // console.log("buyId::",buyId);
    }

    return (
        <div>
            <Divider horizontal>
                    <Header as='h4'><Icon name='plane' />Revisión del Transporte</Header>
            </Divider>
            <Form onSubmit={Formik.handleSubmit}>
                <Form.Group widths='equal'>
                        <Form.Input fluid type='text' required label='Nombre' placeholder='Ingrese Nombre' name='name' onChange={Formik.handleChange}  value={Formik.values.name} error={Formik.errors.name} />
                        <Form.Input fluid type='text' required label='Apellidos' placeholder='Ingrese Apellidos' name='lastName'  onChange={Formik.handleChange}  value={Formik.values.lastName}  error={Formik.errors.lastName} />
                        <Form.Input fluid type='text' label='Teléfono' placeholder=' Ingrese Teléfono' name='phone'  onChange={Formik.handleChange}  value={Formik.values.phone}  error={Formik.errors.phone} />
                </Form.Group>
                <Divider />
                <Form.Group widths='equal'>
                    <Form.Input fluid type='text' required label='E-mail' placeholder='Ingrese E-mail' name='email' onChange={Formik.handleChange}  value={Formik.values.email} error={Formik.errors.email} />
                    <Form.Input fluid type='text' required label='Reingrese E-mail' placeholder='Reingrese E-mail' name='repeatEmail'  onChange={Formik.handleChange}  value={Formik.values.repeatEmail} error={Formik.errors.repeatEmail} />
                </Form.Group>
                <Divider />
                <Form.Field>
                    <Form.Input type='text' required label='Dirección' placeholder='Ingrese Dirección' name='address' onChange={Formik.handleChange}   value={Formik.values.address} error={Formik.errors.address} />
                </Form.Field>
                {/* <Form.Field>
                    <Form.Checkbox type='checkbox'  label='Estoy de acuerdo con los términos y condiciones.' {...Formik.getFieldProps("termsOfService")} name='termsOfService'  value={Formik.values.termsOfService}  error={Formik.errors.termsOfService}/>
                </Form.Field> */}
                <Button content='Volver' secondary onClick={ getStepReviewOrder} />
				<Button content='Limpiar' secondary onClick={ Formik.handleReset } />
                <Button content='Siguiente Paso' primary type="submit"/>
            </Form>
        </div>
    )
}

export default CartTransport
