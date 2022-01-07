import React, { useState, useContext } from "react";
import { Divider, Form, Button, Header, Icon } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import { CartContext } from 'context/CartContext';
import { useFormik } from "formik";
import * as Yup from "yup";

//Firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebase/FirebaseConfig"

function CartPay() {
    const objClient = { nameTitular: '', creditCard: '', lastDate: '', verificationCode: '', quotes: 0 };
    const { itemCard, itemClear, stepUpdate, purchaseOrder, purchaseOrderAdd } = useContext(CartContext);
    const [buyId, setBuyId] = useState('');
    const [orderPay, setOrderPay] = useState({...itemCard});

    const Formik = useFormik({
        initialValues: objClient,
        validationSchema: Yup.object({
            nameTitular: Yup.string().required("El nombre de titular es obligatorio"),
            creditCard: Yup.number("Debe ser númerico").required("El número de tarjeta es obligatorio"),
            lastDate: Yup.string().required("La fecha de tarjeta es obligatoria"),
            verificationCode: Yup.number("Debe ser númerico").required("El código de verificación es obligatorio"),
            quotes: Yup.number().required("El número de cuotas es obligatorio"),
        }),
        onSubmit:(formData)=>{
            console.log("formData::",formData);
            getStepResumenOrder(formData);
        }
    });
    
    /* Price total of Carro */
    const priceTotal =  itemCard.reduce((totalCart, item) => totalCart + (item.price * item.quantity), 0);

    const getStepTransport = () => {
        stepUpdate(2);
    }

    /* Msge finished buy */
    const getStepResumenOrder = async (informationCreditCard) => {
        stepUpdate(4);
        const saleDate = new Date().toLocaleDateString();
        const refPurchaseOrderPay = collection(db, "purchaseOrderPay");
        const docRef = await addDoc(refPurchaseOrderPay, {informationCreditCard, orderPay, priceTotal, saleDate})
        purchaseOrderAdd(docRef.id);
        setBuyId(docRef.id)

        
        console.log("docRef.id::",docRef.id );
        console.log("buyId::::",buyId);
        console.log("purchaseOrder::::",purchaseOrder);

        Swal.fire({
            icon: 'success',
            title: '<b>Gracias por su compra!!!</b>',
            html:'Su código de compra es: [' + docRef.id + '] <br>Te esperamos pronto!!!',
        })
        // Limpia  carro 40seg.
        setTimeout(() => {
            itemClear();
            stepUpdate(1);
        }, 40000);
    }

    const quotesNumber = [
        { key: 1, text: 'Sin Cuotas', value: 1 },
        { key: 2, text: 'Cuota 2', value: 2 },
        { key: 3, text: 'Cuota 3', value: 3 },
        { key: 4, text: 'Cuota 4', value: 4 },
        { key: 5, text: 'Cuota 5', value: 5 },
        { key: 6, text: 'Cuota 6', value: 6 },
        { key: 7, text: 'Cuota 7', value: 7 },
        { key: 8, text: 'Cuota 8', value: 8 },
        { key: 9, text: 'Cuota 9', value: 9 },
        { key: 10, text: 'Cuota 10', value: 10 }
      ]

    return (
        <div>
            <Divider horizontal>
                    <Header as='h4'><Icon name='credit card outline' />Revisión del Medio de Pago</Header>
            </Divider>
            <Form onSubmit={Formik.handleSubmit}>
                <Form.Input fluid type='text' required label='Nombre Titular' placeholder='Ingrese Nombre Titular' name='nameTitular' onChange={Formik.handleChange}  value={Formik.values.nameTitular} error={Formik.errors.nameTitular} />
                <Form.Group widths='equal'>
                        <Form.Input fluid type='text' required label='Número Tarjeta' placeholder='Ingrese Número Tarjeta' name='creditCard'  onChange={Formik.handleChange}  value={Formik.values.creditCard}  error={Formik.errors.creditCard} />
                        <Form.Input fluid type='month' required label='Fecha Expiración' placeholder='Ingrese Fecha Expiración' name='lastDate'  onChange={Formik.handleChange}  value={Formik.values.lastDate}  error={Formik.errors.lastDate} />
                        <Form.Input fluid type='text' required label='Código Verificación' placeholder=' Ingrese Código Verificación' name='verificationCode'  onChange={Formik.handleChange}  value={Formik.values.verificationCode}  error={Formik.errors.verificationCode} />
                </Form.Group>
                <Divider />
                <Form.Select fluid label='Ingrese Cuotas' required placeholder='Ingrese Cuotas' options={quotesNumber} onChange={Formik.handleChange}  error={Formik.errors.quotes} value={Formik.values.quotes} />
                <Button content='Volver' secondary onClick={ getStepTransport} />
				<Button content='Limpiar' secondary onClick={ Formik.handleReset } />
                <Button content='Finalizar Compra' primary type="submit"/>
            </Form>
        </div>
    )
}

export default CartPay
