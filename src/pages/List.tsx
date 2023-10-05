import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { addOutline, logInOutline, trashBinOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import './List.css'

type Props = {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
  };
  
const TIME = 300; // ms

const List: React.FC = () => {
    const [userinput, setUserinput] = useState<string>([]);
    const [searchedUser,setSearchedUser] = useState<any[]>([]);

    const nameInputRef = useRef<HTMLIonInputElement>(null)
    const emailInputRef = useRef<HTMLIonInputElement>(null)

    const doAddContact = async () => {
        const name = nameInputRef?.current?.value || [];        
        const email = emailInputRef?.current?.value;

        if (!name || !email){
            return;
        }

        setUsers([{name, email}, ...users])
        cardModal.current?.dismiss()   
    }

    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert] = useIonAlert();
    const [showToast] = useIonToast();
    const [selectedUser, setSelectedUser] = useState<any[]>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const cardModal = useRef<HTMLIonModalElement>(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const page = useRef(null);

    const[activeSegment, setActiveSegment] = useState<any>('details');

    useEffect(()=>{
        setPresentingElement(page.current);
    },[])

    useIonViewWillEnter(async ()=>{
        const Users = await getUsers();
        console.log('🚀 ~ file: List.tsx12 ~getUsers ~users :', Users);
        setUsers(Users);
        setSearchedUser(Users);
        setLoading(false);
    })

    const getUsers =async () => {
        const data = await fetch('https://randomuser.me/api?results=10');
        const users = await data.json();
        return users.results;
    }

    const clearList = () => {
        showAlert({
            header: 'Confirm!',
            message: 'Are you sure you want to delete all users?',
            buttons:[
                {text: 'Cancel', role: 'cancel'},
                {text: 'Delete', handler: ()=>{setUsers([]);
                showToast({
                    message: 'All users deleted',
                    duration: 2000,
                    color: 'danger'
                })}},
            ]
        })
        
    }

    const doRefresh = async (event: any) => {
        const data = await getUsers();
        setUsers(data);
        setSearchedUser(data);
        event.detail.complete();
    }

    const [query, setQuery] = useState("")


    const handleChangeSearch = (event) => {
        const value = event.target.value;
        
        if(value&& value.trim() != ''){
            setSearchedUser(searchedUser.filter(
                (user)=> (user?.name?.first.toLowerCase().indexOf(value.toLowerCase()) > -1
            )))
        } else {
            setSearchedUser(users);
        }
    }

    return (
        <IonPage ref={page}>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot='start'>
                        <IonMenuButton/>
                    </IonButtons>
                    
                    <IonTitle>List</IonTitle>

                    <IonButtons slot='end'>
                        <IonButton onClick={clearList}>
                            <IonIcon color={'light'} slot='icon-only' icon={trashBinOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>

                <IonToolbar color={'success'}>
                    <IonSearchbar    placeholder="Search Api here"
                  onIonChange={handleChangeSearch}/>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
                    <IonRefresherContent>

                    </IonRefresherContent>
                </IonRefresher>

                {loading && (
                    [...Array(10)].map((_, index)=>(
                        <IonCard key={index}>
                            <IonCardContent className='ion-no-padding'>
                            <IonItem lines='none'>
                                <IonAvatar slot='start'>
                                    <IonSkeletonText/>
                                </IonAvatar>
                                <IonLabel>
                                <IonSkeletonText animated style={{width: '150px'}}/>
                                    <p><IonSkeletonText/></p>
                                </IonLabel>
                                <IonChip slot='end' color={'primary'}>
                                    
                                </IonChip>
                            </IonItem>
                            
                        </IonCardContent>
                        </IonCard>
                    ))
                )}


                {searchedUser.map((user, index)=>(
                    <IonCard key={index} onClick={()=> setSelectedUser(user)}>
                        <IonCardContent className='ion-no-padding'>
                            <IonItem lines='none'>
                                <IonAvatar slot='start'>
                                    { user.picture?.large ? <IonImg src={user.picture?.large ? user.picture?.large : null } /> : <IonSkeletonText/> }
                                </IonAvatar>
                                <IonLabel>
                                    {user.name.first ? user.name.first : user.name } {user.name.last ? user.name.last : null}
                                    <p>{user.email}</p>
                                </IonLabel>
                                {   user.nat ? 
                                    <IonChip slot='end' color={'primary'}> {user.nat}</IonChip>
                                    : null 
                                }
                            </IonItem>
                            
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal breakpoints={[0, 0.5, 0.8]} initialBreakpoint={0.5} ref={modal} isOpen={selectedUser !== null} onIonModalDidDismiss={()=> setSelectedUser(null)}>
                    <IonHeader>
                        <IonToolbar color={'light'}>
                            <IonButtons slot='start'>
                                <IonButton onClick={()=>modal.current?.dismiss()}>
                                    close   
                                </IonButton>
                            </IonButtons>
                            <IonTitle>
                            {selectedUser?.name.first} {selectedUser?.name.last}
                            </IonTitle>
                        </IonToolbar>

                        <IonToolbar color={'light'}>
                            <IonSegment value={activeSegment} onIonChange={(e)=> setActiveSegment(e.detail.value!)}>
                                <IonSegmentButton value="details">Details</IonSegmentButton>
                                <IonSegmentButton value="calendar">Calendar</IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className='ion-padding'>
                        {activeSegment === 'details' && (
                            <IonCard>
                                <IonAvatar slot='start'>
                                    { selectedUser?.picture?.large ? <IonImg src={selectedUser?.picture?.large ? selectedUser?.picture?.large : null } /> : <IonSkeletonText/> }

                                </IonAvatar>
                                <IonCardContent className='ion-no-padding'>
                                    <IonItem lines='none'>
                                        <IonLabel>
                                            {selectedUser?.name.first ? selectedUser?.name.first : selectedUser?.name } {selectedUser?.name.last ? selectedUser?.name.last : null}
                                            <p>{selectedUser?.email}</p>
                                        </IonLabel>
                                    </IonItem>
                                </IonCardContent>

                             
                            </IonCard>
                        )}
                        {activeSegment === 'calendar' && <IonDatetime/>}
                    </IonContent>
                </IonModal>
            </IonContent>

            <IonModal ref={cardModal} trigger='card-modal' presentingElement={presentingElement!}>
            <IonHeader>
                        <IonToolbar color={'success'}>
                            <IonButtons slot='start'>
                                <IonButton onClick={()=>cardModal.current?.dismiss()}>
                                    close   
                                </IonButton>
                            </IonButtons>
                            <IonTitle>
                            Add Contact
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent class='ion-padding'>
                    
                            <IonInput ref={nameInputRef} mode='md' className='ion-margin-top' fill="outline" labelPlacement='floating' label='Name' placeholder='Marsetio Noorprajuda'></IonInput>
                            <IonInput ref={emailInputRef} className='ion-margin-top' mode='md' fill="outline" labelPlacement='floating' label='Email' type="email" placeholder='marsetio.noor@kontaktieren.com'></IonInput>
                            <IonButton onClick={doAddContact} className='ion-margin-top' type='submit' expand='block'>
                                Add New Contact
                            </IonButton>
                        
                    </IonContent>
            </IonModal>
            <IonFab vertical='bottom' horizontal='end' slot='fixed'>
                <IonFabButton id='card-modal'>
                    <IonIcon icon={addOutline}/>
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default List;