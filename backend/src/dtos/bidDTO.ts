import {
	IsDateString,
	IsDefined,
	IsIn,
	IsInt,
	IsNotEmpty,
	IsNumber,
	MinLength,
	NotEquals,
	ValidateIf,
} from "class-validator";
import { BidType } from "../db";

export class BidDTO {
	@IsNotEmpty()
	@IsDateString()
		time!: string;

	@IsDefined()
	@IsIn(["comp", "noncomp"])
		type!: BidType;

	@IsDefined()
	@NotEquals(0)
	@IsInt({ message: "$property should be a valid id number" })
		amount!: number;

	@IsNumber()
	@IsDefined()
	@ValidateIf((o) => o.type === "comp")
		rate!: number;

	@IsDefined()
	@NotEquals(0)
	@IsInt({ message: "$property should be a valid id number" })
		auctionId!: number;

	@IsDefined()
	@MinLength(3, {
		message: "$property should be at least $constraint1 characters long",
	})
		userName!: string;
}
