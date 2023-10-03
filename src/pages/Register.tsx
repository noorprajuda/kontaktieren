import { IonButton, IonButtons, IonBackButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import { checkmarkDoneOutline, } from 'ionicons/icons'

const Register: React.FC = () => {
    const router = useIonRouter();

    const doRegister = (event: any) => {
        event.preventDefault();
        console.log('doRegister');
        router.goBack();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Register Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent scrollY={false}>
            <IonGrid fixed>
                <IonRow className='ion-justify-content-center'>
                    <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                        <IonCard>
                            <IonCardContent>
                                <div className='ion-text-center ion-padding'>
                                    {/* <img src={Kontaktieren} alt='Kontaktieren Logo' width={'50%'}/> */}
                                </div>
                                <form onSubmit={doRegister}>
                                    <IonInput fill="outline" labelPlacement='floating' label='Email' type="email" placeholder='marsetio.noor@kontaktieren.com'></IonInput>
                                    <IonInput className='ion-margin-top' fill="outline" labelPlacement='floating' label='Password' type="password" placeholder='password'></IonInput>
                                    <IonButton className='ion-margin-top' type='submit' expand='block'>
                                        Create my account
                                        <IonIcon icon={checkmarkDoneOutline} slot='end' />
                                    </IonButton>
                                </form>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>

              
            </IonContent>
        </IonPage>
    );
};

export default Register;