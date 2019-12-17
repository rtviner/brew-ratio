class Api::InstructionsController < ApplicationController
  # all instructions
  def index
    # render :json => Instruction.all
    @instructions = Instruction.by_brewMethod(params[:brewMethod])
    render :json => @instructions
  end
  # instructions by id
  def show
    @instruction = Instruction.find(params[:id])
    render :json => @instruction
  end

  def create
    instruction = Instruction.new(instruction_params)

    if instruction.save
      render json: instruction, status: :created
    else
      # render json: instruction.errors, status: :unprocessable_entity
      render 'new'
    end
  end

  def destroy
    @instruction = Instruction.find(params[:id])
    @instruction.destroy
  end

  def update
    @instruction = Instruction.find(params[:id])
    if  @instruction.update(instruction_params)
      render json: @instruction
    else
      # render json: @instruction.errors, status: :unprocessable_entity
      render 'edit'
    end
  end

  private
    def instruction_params
      params.require(:instruction).permit(
        :brewMethod,
        :grindSize,
        :steps
      )
    end
end
