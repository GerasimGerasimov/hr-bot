export default class Candidate {
    constructor () {
        this.ID = 0 //кол-во кандидатов найденных БОТом (заполняется БОТом)
        this.Group = 0 //ID группы
        this.FullName = '', //Имя кандидата
        this.ProfileURI ='',//Ссылка на LinkedIn
        this.Company = '',//Текущее место работы кандидата
        this.Position = '',//Должность кандидата
        this.Status = '',//Статус. Возможные статусы:
                            // 0) Added Кандидат добавлен ещё НЕ принял приглашение
                            // 1) InvitationAccepted Кандидат принял предложение
                            // 2) PrivateMessageRespond Кандидат ответил на личное сообщение
        this.StatusDate = Date.now().toString() //дата изменения статуса
        this.Note = '' //Примечание HR`a о Кандидате
        this.Checked = false,//
        this.uri = ''   //ссылка на Кандидата для API
    }  
}
