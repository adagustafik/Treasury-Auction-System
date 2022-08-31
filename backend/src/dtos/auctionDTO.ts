import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class AuctionDTO {
	auctionId!: number;

	@IsNumber()
	@IsNotEmpty()
		securityOffered!: number;

	@IsNotEmpty()
	@IsDateString()
		auctionDate!: string;

	@IsNotEmpty()
	@IsDateString()
		issueDate!: string;

	@IsNotEmpty()
	@IsDateString()
		maturityDate!: string;

	@IsNotEmpty()
		termsAndConditions!: string;

	@IsNotEmpty()
	@IsDateString()
		nonCompetitiveBidCloseTime!: string;

	@IsNotEmpty()
	@IsDateString()
		competitiveBidCloseTime!: string;

	@IsNumber()
	@IsNotEmpty()
		yield!: number;

	@IsNumber()
	@IsNotEmpty()
		rate!: number;

	@IsNumber()
	@IsNotEmpty()
		discount!: number;
}
