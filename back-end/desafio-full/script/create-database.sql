create database desafio_full;
go

use desafio_full;
go

create table dbo.debts
(
	id int identity(1,1) not null
	,title_number int not null
	,debtor_name varchar(100) not null
	,debtor_cpf varchar(15) not null
	,interest_percentage_rate decimal(18, 2) NOT NULL
	,penalty_percentage_rate decimal(18, 2) NOT NULL  
	,creation_date datetimeoffset(7) not null default(sysdatetimeoffset())
	,last_update datetimeoffset(7) not null default(sysdatetimeoffset())
	,constraint PK_debts primary key (id)
	,constraint UQ_debts unique (id, title_number)
);
go

create table dbo.installments
(
	id int identity(1,1) not null
	,number int not null
	,due_date datetimeoffset(7) not null default(sysdatetimeoffset())
	,value decimal(18, 2) NOT NULL
	,id_debt int not null
	,creation_date datetimeoffset(7) not null default(sysdatetimeoffset())
	,last_update datetimeoffset(7) not null default(sysdatetimeoffset())
	,constraint PK_installment primary key (id)
	,constraint FK_installment foreign key (id_debt) references dbo.debts(id)
	,constraint UQ_installment unique (id, number, id_debt)
);
go