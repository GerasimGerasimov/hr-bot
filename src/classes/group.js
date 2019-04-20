export default class GroupTemplate {
    constructor (username) {
        this.CandidatesCount = 0 //кол-во кандидатов найденных БОТом (заполняется БОТом)
        this.GroupName = '', //?! Я НЕ УВИДЕЛ ГДЕ БЫ ОНО ИСПОЛЬЗОВАЛОСЬ!!!
        this.Created = Date.now().toString() //дата создания группы  (формируется автоматически)
        this.SearchParams = '' //это строка поиска передаваемая БОТу[требуется БОТу]
                               //формируется из: Circles, Location, Title, Exceptions
                               //
        this.MessageTemplate = //строка шаблонного сообщения отправляемая соискателям при первой рассылке (Заполняется HR`ом)[требуется БОТу]
                               //?! Заменяет inv_text, НО я могу переименовать в inv_text - надо согласовать
`Здравствуйте $CandidateName!
Я рекрутёр $UserName.
Ищу специалиста для работы в $Owner на должности $Position.
Прошу принять моё приглашение. С уважением, $UserName.`,
        this.Circles = '1,2' //груг поиска на LinkedIn (Заполняется HR`ом)[требуется БОТу при формировании SearchParams] 
        this.Owner = username //Ник-нейм или e-mail HR`a разместившего вакансию (формируется автоматически)
                            //?! Если менять на owner_id - то надо его передавать при входе в систему 
        this.Employer = ''//Наименование работодателя (Заполняется HR`ом)[для удобства HR`а]
        this.Position = ''//Название должности сформулированное Работодателем (Заполняется HR`ом)[для удобства HR`а]
        this.Skills = '' //Требуемые скилы соискателей для данной вакансии (Заполняется HR`ом)[для удобства HR`а]
        this.Location = ''//Расположение вакансии (Заполняется HR`ом)[требуется БОТу при формировании SearchParams] 
                          //в базе сейчас это называется "geo"
        this.Title = '' //Название должности просклонённое на разные лады на разных языках (Заполняется HR`ом)[требуется БОТу при формировании SearchParams] 
                        //?! в базе это position_var
        this.Exceptions = 'HR, Директор, Manager, CEO' //Исключения просклонённое на разные лады на разных языках (Заполняется HR`ом)[требуется БОТу при формировании SearchParams] 
                         //в базе сейчас это называется "constrainst"
        this.Visible = 'true', //При создании группы Visible = true
                              //HR-ставит Visible=false чтобы скрыть кампанию в Архив
                              //В дальнейшем скрытая группа може пригодится как шаблон
                              //для новой кампании
        this.uri = ''   //ссылка на группу
    }  
}
