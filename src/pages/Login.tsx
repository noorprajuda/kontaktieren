import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logInOutline, personCircleOutline } from 'ionicons/icons'
import Kontaktieren from "../assets/kontaktieren.png";
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';

const Login: React.FC = () => {

    const [present, dismiss] = useIonLoading();

    const router = useIonRouter();
    
    const [introSeen, setIntroSeen] = useState(true)

    const INTRO_KEY = 'intro-seen';

    useEffect(()=>{
        const checkStorage = async () => {
            const seen = await Preferences.get({key: INTRO_KEY});
            console.log('🚀 ~ file: Login.tsx17 ~checkStorage ~seen :', seen);
            setIntroSeen(seen.value === 'true'); 
        }

        checkStorage();
    },[])

    const doLogin = async (event: any) => {
        event.preventDefault();
        await present('Logging in...');
        setTimeout(async ()=>{
            dismiss();
            router.push('/app', 'root');
        }, 2000)
    }

    const finishIntro = async () => {
        console.log('FIN');
        setIntroSeen(true);
        Preferences.set({key: INTRO_KEY, value: 'true'})
        
    }

    const seeIntroAgain = ()=>{
        setIntroSeen(false);
        Preferences.remove({key: INTRO_KEY});
    }

    return (
        <>
        {!introSeen ? (
            <Intro onFinish={finishIntro}/>
        )
        : (
            <IonPage>
                <IonHeader>
                    <IonToolbar color={'success'}>
                        <IonTitle>Kontaktieren</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent scrollY={false} className='ion-padding'>
                    <IonGrid fixed>
                        <IonRow className='ion-justify-content-center'>
                            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                            <div className='ion-text-center ion-padding'>
                                <img src={Kontaktieren} alt='Kontaktieren Logo' width={'50%'}/>
                            </div>
                            </IonCol>
                        </IonRow>

                        <IonRow className='ion-justify-content-center'>
                            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                <IonCard>
                                    <IonCardContent>                            
                                        <form onSubmit={doLogin}>
                                            <IonInput mode='md' fill="outline" labelPlacement='floating' label='Email' type="email" placeholder='marsetio.noor@kontaktieren.com'></IonInput>
                                            <IonInput mode='md' className='ion-margin-top' fill="outline" labelPlacement='floating' label='Password' type="password" placeholder='password'></IonInput>
                                            <IonButton className='ion-margin-top' type='submit' expand='block'>
                                                Login
                                                <IonIcon icon={logInOutline} slot='end' />
                                            </IonButton>
                                            <IonButton routerLink="/register" color={'secondary'} className='ion-margin-top' expand='block'>
                                                Create account
                                                <IonIcon icon={personCircleOutline} slot='end' />
                                            </IonButton>

                                            <IonButton onClick={seeIntroAgain} fill='clear' size='small' color={'medium'} className='ion-margin-top' expand='block'>
                                                Watch intro again
                                            </IonButton>
                                        </form>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        )}
        </>
    );
};

export default Login;