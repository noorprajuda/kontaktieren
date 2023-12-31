import { Camera, CameraResultType } from '@capacitor/camera';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';


function Tab1() {
    const [image, setImage] = useState<any>(null);

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
        });

        const img = `data:image/jpge;base64,${image.base64String}`;
        setImage(img);

    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>

                    <IonTitle>Upload Photo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand="full" onClick={takePicture}>Take picture</IonButton>
                <img src={image} alt="" />
            </IonContent>
        </IonPage>
    );
}

export default Tab1;